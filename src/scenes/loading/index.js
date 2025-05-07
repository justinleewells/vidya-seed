import { Scene } from 'phaser'

const extractName = (path) => {
  const spl = path.split('/')
  return spl[spl.length - 1].split('.')[0]
}

const extractType = (path) => {
  const spl = path.split('/')
  return spl[spl.length - 2]
}

export default class LoadingScene extends Scene {
  constructor() {
    super('LoadingScene')
  }
  preload() {
    const locale = this.localize.isAvailable(navigator.language)
      ? navigator.language
      : 'en-US'
    this.localize.load(locale)

    // Load fonts.
    const requireFont = require.context('@assets/fonts')
    requireFont.keys().forEach((path) => {
      if (path.indexOf('.png') <= 0) return
      const name = extractName(path)
      const png = requireFont(path)
      const xml = requireFont(path.replace('.png', '.xml'))
      this.load.bitmapFont(name, png, xml)
    })

    // Load images.
    const requireImage = require.context('@assets/images')
    requireImage.keys().forEach((path) => {
      const name = extractName(path)
      const type = extractType(path)
      this.load.image(`${type}/${name}`, requireImage(path))
    })

    // Spritesheets
    // First, load the configs.
    const requireSpritesheet = require.context('@assets/spritesheets')
    let spritesheetConfigs = {}
    requireSpritesheet.keys().forEach((path) => {
      if (path.indexOf('config') <= 0) return
      const type = extractType(path)
      spritesheetConfigs[type] = requireSpritesheet(path)
    })
    // Next, load the image files.
    requireSpritesheet.keys().forEach((path) => {
      if (path.indexOf('config') >= 0) return
      const type = extractType(path)
      const config = spritesheetConfigs[type]
      if (!config) return
      const name = extractName(path)
      this.load.spritesheet(`${type}/${name}`, requireSpritesheet(path), config)
    })

    // Load audio.
    const requireAudio = require.context('@assets/audio')
    requireAudio.keys().forEach((path) => {
      const name = extractName(path)
      this.load.audio(name, [requireImage(path)])
    })

    // Load game objects and register their factories.
    const requireGameObject = require.context('@game-objects')
    requireGameObject.keys().forEach((path) => {
      const { factoryFn } = requireGameObject(path)
      const name = extractName(path)
        .split('-')
        .map((w, i) => (i > 0 ? w.replace(/^\w/, (c) => c.toUpperCase()) : w))
        .join('')
      Phaser.GameObjects.GameObjectFactory.register(name, factoryFn)
    })
  }
  create() {
    this.scene.start('DevScene')
  }
}
