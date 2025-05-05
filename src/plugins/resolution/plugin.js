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
    this.timeout = null
    this.game.scale.on('enterfullscreen', this.enterFullScreen, this)
    this.game.scale.on('leavefullscreen', this.leaveFullScreen, this)
    this.game.scale.on('resize', this.resize, this)
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
    this.game.scale
      .setGameSize(
        this.fullScreen
          ? Math.floor(window.innerWidth / this.scale)
          : this.width,
        this.fullScreen
          ? Math.floor(window.innerHeight / this.scale)
          : this.height
      )
      .setZoom(Math.min(this.maxScale, this.scale))
    this.game.events.emit('updateresolution')
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
  setFullScreen() {
    this.game.scale.startFullscreen()
    return this._update()
  }
  // Lifecycle
  resize() {
    if (!this.timeout) {
      this.timeout = setTimeout(() => {
        this._update()
        this.timeout = null
      }, 100)
    }
  }
  enterFullScreen() {
    this.config.fullScreen = true
    this._update()
  }
  leaveFullScreen() {
    this.config.fullScreen = false
    this._update()
  }
}

const config = {
  type: 'global',
  key: 'ResolutionPlugin',
  mapping: 'resolution',
}

export { ResolutionPlugin as plugin, config }
