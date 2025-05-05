import { Plugins } from 'phaser'
import Positions from '@enums/positions'

class UiPlugin extends Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager)
    this.anchors = []
  }
  addAnchor(element, position, x, y) {
    const anchor = { element, position, x, y }
    this.anchors.push(anchor)
    this.updateAnchor(anchor)
  }
  updateAnchor({ element, position, x, y }) {
    const { width, height } = this.game.scale

    let anchorX = 0
    let anchorY = 0

    // Center column
    switch (position) {
      case Positions.TOP:
      case Positions.CENTER:
      case Positions.BOTTOM:
        anchorX = Math.floor(width / 2)
    }

    // Right column
    switch (position) {
      case Positions.TOP_RIGHT:
      case Positions.RIGHT:
      case Positions.BOTTOM_RIGHT:
        anchorX = width
    }

    // Middle row
    switch (position) {
      case Positions.LEFT:
      case Positions.CENTER:
      case Positions.RIGHT:
        anchorY = Math.floor(height / 2)
    }

    // Bottom row
    switch (position) {
      case Positions.BOTTOM_LEFT:
      case Positions.BOTTOM:
      case Positions.BOTTOM_RIGHT:
        anchorY = height
    }

    element.setPosition(anchorX + x, anchorY + y)
  }
  // Lifecycle
  boot() {
    this.systems.events.on('destroy', this.destroy, this)
    this.game.events.on('updateresolution', this.updateResolution, this)
  }
  destroy() {
    super.destroy()
    this.anchors = []
    this.game.events.off('updateresolution', this.updateResolution, this)
  }
  updateResolution() {
    this.anchors.forEach(this.updateAnchor.bind(this))
  }
}

const config = {
  type: 'scene',
  key: 'UiPlugin',
  mapping: 'ui',
}

export { UiPlugin as plugin, config }
