import Phaser from 'phaser'

class ResourceBar extends Phaser.GameObjects.Container {
  constructor(scene, { x, y, width, height, color, displayType }) {
    super(scene, x, y)

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

    this.foreground = scene.add
      .rectangle(0, 0, width, height, color[500])
      .setOrigin(0, 0)
    this.add(this.foreground)

    this.overfill = scene.add
      .rectangle(64, 0, width, height, color[50])
      .setOrigin(0, 0)
    this.add(this.overfill)

    this.value = scene.add
      .text(width / 2, height / 2, '0/0', {
        fontSize: height - 4,
        fontFamily: 'Arial',
        color: 0xffffff,
      })
      .setOrigin(0.5, 0.5)
      .setVisible(displayType == 'static')
    this.add(this.value)
  }
  setValue(current, max, extra = 0) {
    const total = Math.max(max, current + extra)
    this.foreground.width = this.background.width * (current / total)
    this.overfill.width = this.background.width * (extra / total)
    this.overfill.x = this.foreground.width
    this.value.text = `${current + extra}/${max}`
  }
  setColor(color) {
    this.background.setFillStyle(color[900])
    this.foreground.setFillStyle(color[500])
    this.overfill.setFillStyle(collor[50])
  }
  preUpdate() {}
}

function createResourceBar(args = {}) {
  const resourceBar = new ResourceBar(this.scene, args)
  this.displayList.add(resourceBar)
  this.updateList.add(resourceBar)
  return resourceBar
}

export { ResourceBar, createResourceBar as factoryFn }
