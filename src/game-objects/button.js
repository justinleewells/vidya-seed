import Phaser from 'phaser'
import { Grey } from '@shared/colors'

class Button extends Phaser.GameObjects.Container {
  constructor(
    scene,
    { x, y, width, height, color, text, fontStyle, callback }
  ) {
    super(scene, x, y)
    this.color = color
    this.callback = callback

    this.background = scene.add
      .rectangle(0, 0, width, height, color[500])
      .setOrigin(0, 0)
    this.add(this.background)

    this.text = scene.add
      .text(
        width / 2,
        height / 2,
        text,
        fontStyle ?? {
          fontSize: 12,
          fontFamily: 'Arial',
          color: '#ffffff',
        }
      )
      .setOrigin(0.5, 0.5)
    this.add(this.text)

    this.enable()
  }
  setCallback(callback) {
    this.callback = callback
  }
  enable() {
    this.background.setFillStyle(this.color[500])
    this.background
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => this.background.setFillStyle(this.color[300]))
      .on('pointerout', () => this.background.setFillStyle(this.color[500]))
      .on('pointerdown', () => this.background.setFillStyle(this.color[900]))
      .on('pointerup', () => {
        this.background.setFillStyle(this.color[300])
        this.callback()
      })
  }
  disable() {
    this.background.setFillStyle(Grey[500]).removeInteractive(false)
  }
  destroy() {
    super.destroy()
    this.color = undefined
    this.callback = undefined
    this.background = undefined
    this.text = undefined
  }
}

function createButton(args) {
  const button = new Button(this.scene, args)
  this.displayList.add(button)
  return button
}

export { Button, createButton as factoryFn }
