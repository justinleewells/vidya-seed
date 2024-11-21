import Phaser from 'phaser'

const createSegment = (bar, width, color) => {
  const x = bar.segments.reduce(
    (sum, segment) => (sum += segment.width + bar.gutterWidth),
    0
  )
  return bar.scene.add
    .rectangle(x, 0, width, bar.background.height, color)
    .setOrigin(0, 0)
}

class SegmentedResourceBar extends Phaser.GameObjects.Container {
  constructor(scene, { x, y, width, height, color, displayType, gutterWidth }) {
    super(scene, x, y)
    this.color = color
    this.gutterWidth = gutterWidth

    this.background = scene.add
      .rectangle(0, 0, width, height, color[900])
      .setOrigin(0, 0)
    if (displayType == 'hover') {
      this.background
        .setInteractive()
        .on('pointerover', () => {
          this.value.setVisible(true)
        })
        .on('pointerout', () => {
          this.value.setVisible(false)
        })
    }
    this.add(this.background)

    this.value = scene.add
      .text(width / 2, height / 2, '0/0', {
        fontSize: height - 4,
        fontFamily: 'Arial',
        color: '#212121',
      })
      .setOrigin(0.5, 0.5)
      .setVisible(displayType == 'static')
    this.add(this.value)

    this.segments = []
  }
  setValue(current, max, extra = 0) {
    const total = Math.max(max, current + extra)
    const segmentWidth = Math.floor(
      (this.background.width - this.gutterWidth * (total - 1)) / total
    )
    let remainder =
      this.background.width -
      this.gutterWidth * (total - 1) -
      total * segmentWidth
    this.segments.forEach((segment) => segment.destroy())
    this.segments = []
    for (let i = 0; i < current; i++) {
      const width = segmentWidth + (remainder-- > 0 ? 1 : 0)
      const segment = createSegment(this, width, this.color[500])
      this.add(segment)
      this.segments.push(segment)
    }
    for (let i = 0; i < extra; i++) {
      const width = segmentWidth + (remainder-- > 0 ? 1 : 0)
      const segment = createSegment(this, width, this.color[50])
      this.add(segment)
      this.segments.push(segment)
    }
    this.value.text = `${current + extra}/${max}`
    this.bringToTop(this.value)
  }
  preUpdate() {}
}

function createSegmentedResourceBar(args = {}) {
  const segmentedResourceBar = new SegmentedResourceBar(this.scene, args)
  this.displayList.add(segmentedResourceBar)
  this.updateList.add(segmentedResourceBar)
  return segmentedResourceBar
}

export { SegmentedResourceBar, createSegmentedResourceBar as factoryFn }
