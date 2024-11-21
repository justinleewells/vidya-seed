import Phaser from 'phaser'

class Tooltip extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0)
    this.background = scene.add
      .rectangle(0, 0, 0, 0, 0x000000, 0.75)
      .setOrigin(0, 0)
    this.add(this.background)
    this.text = scene.add
      .text(8, 0, 'Placeholder', {
        fontSize: 12,
        fontFamily: 'Arial',
        color: '#ffffff',
      })
      .setOrigin(0.5, 0.5)
      .setWordWrapWidth(128)
    this.add(this.text)
    this.setVisible(false)
  }
  setPosition(x, y) {
    super.setPosition(x, y)
    let xOrigin = x < this.scene.game.config.width / 2 ? 0 : 1
    let yOrigin = y < this.scene.game.config.height / 2 ? 0 : 1
    this.setOrigin(xOrigin, yOrigin)
    if (this.text) {
      this.text.setPosition(xOrigin == 0 ? 8 : -8, yOrigin == 0 ? 8 : -8)
    }
  }
  setOrigin(x, y) {
    this.list.forEach((child) => child.setOrigin(x, y))
  }
  display(text) {
    this.text.text = text
    this.background.setSize(this.text.width + 16, this.text.height + 16)
    this.setVisible(true)
  }
  preUpdate() {}
}

function createTooltip() {
  const tooltip = new Tooltip(this.scene)
  this.displayList.add(tooltip)
  this.updateList.add(tooltip)
  return tooltip
}

export { Tooltip, createTooltip as factoryFn }
