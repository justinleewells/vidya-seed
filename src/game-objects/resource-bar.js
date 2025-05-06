import Phaser from 'phaser'

class ResourceBar extends Phaser.GameObjects.Container {
  constructor(scene, { x, y, width, height, color }) {
    super(scene, x, y)

    this.background = scene.add
      .rectangle(0, 0, width, height, color[900])
      .setOrigin(0, 0)
    this.add(this.background)

    this.foreground = scene.add
      .rectangle(0, 0, width, height, color[500])
      .setOrigin(0, 0)
    this.add(this.foreground)

    this.overfill = scene.add
      .rectangle(64, 0, width, height, color[50])
      .setOrigin(0, 0)
    this.add(this.overfill)
  }
  setValue(current, max, extra = 0) {
    const total = Math.max(max, current + extra)
    this.foreground.width = this.background.width * (current / total)
    this.overfill.width = this.background.width * (extra / total)
    this.overfill.x = this.foreground.width
  }
  setColor(color) {
    this.background.setFillStyle(color[900])
    this.foreground.setFillStyle(color[500])
    this.overfill.setFillStyle(color[50])
  }
  destroy() {
    super.destroy()
    this.background = undefined
    this.foreground = undefined
    this.overfill = undefined
  }
}

function createResourceBar(args = {}) {
  const resourceBar = new ResourceBar(this.scene, args)
  this.displayList.add(resourceBar)
  return resourceBar
}

export { ResourceBar, createResourceBar as factoryFn }
