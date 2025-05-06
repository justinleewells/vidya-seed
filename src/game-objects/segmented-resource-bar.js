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
  constructor(scene, { x, y, width, height, color, gutterWidth }) {
    super(scene, x, y)
    this.color = color
    this.gutterWidth = gutterWidth

    this.background = scene.add
      .rectangle(0, 0, width, height, color[900])
      .setOrigin(0, 0)
    this.add(this.background)

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
  }
  destroy() {
    super.destroy()
    this.color = undefined
    this.background = undefined
    this.segments = undefined
  }
}

function createSegmentedResourceBar(args = {}) {
  const segmentedResourceBar = new SegmentedResourceBar(this.scene, args)
  this.displayList.add(segmentedResourceBar)
  return segmentedResourceBar
}

export { SegmentedResourceBar, createSegmentedResourceBar as factoryFn }
