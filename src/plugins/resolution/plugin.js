import { Plugins } from 'phaser'

// TODO: Handle NW.js logic
class ResolutionPlugin extends Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager)
    this.config = {
      width: 800,
      height: 600,
      scale: 1,
      fullScreen: false,
    }
  }
  get width() {
    return this.config.width
  }
  get height() {
    return this.config.height
  }
  get scale() {
    return this.config.scale
  }
  get maxScale() {
    return Math.min(
      Math.floor(window.innerWidth / this.width),
      Math.floor(window.innerHeight / this.height)
    )
  }
  get fullScreen() {
    return this.config.fullScreen
  }
  _update() {
    this.config.scale = Math.min(this.maxScale, this.scale)
    this.game.scale
      .setGameSize(
        this.fullScreen
          ? Math.floor(window.innerWidth / this.scale)
          : this.width,
        this.fullScreen
          ? Math.floor(window.innerHeight / this.scale)
          : this.height
      )
      .setZoom(this.scale)
    return this
  }
  setDimensions(width, height) {
    Object.assign(this.config, { width, height })
    return this._update()
  }
  setScale(scale) {
    this.config.scale = scale
    return this._update()
  }
  setFullScreen(fullScreen) {
    this.config.fullScreen = fullScreen
    return this._update()
  }
}

const config = {
  type: 'global',
  key: 'ResolutionPlugin',
  mapping: 'resolution',
}

export { ResolutionPlugin as plugin, config }
