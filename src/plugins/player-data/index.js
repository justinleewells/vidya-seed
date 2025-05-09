import { Plugins } from 'phaser'

const serialize = (data) => {
  return JSON.stringify(data)
}

const deserialize = (data) => {
  return JSON.parse(data)
}

const migrate = (data) => {
  if (data.version === undefined) {
    data.metadata = {}
    return
  }
}

// TODO: Handle NW.js logic
// TODO: Consider refactoring metadata into its own item
class PlayerDataPlugin extends Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager)
    this.slot = 0
    this.version = 0
  }
  get metadata() {
    return Object.keys(window.localStorage)
      .filter((key) => key.startsWith('save'))
      .map((key) => deserialize(window.localStorage.getItem(key)).metadata)
  }
  get key() {
    return `save${this.slot}`
  }
  save() {
    window.localStorage.setItem(this.key, serialize(this.data))
  }
  load() {
    let data = deserialize(window.localStorage.getItem(this.key)) ?? {}

    if (data.version !== this.version) {
      migrate(data)
      data.version = this.version
    }

    this.data = data
  }
  get() {
    return this.data
  }
}

const config = {
  type: 'global',
  key: 'PlayerDataPlugin',
  mapping: 'playerData',
}

export { PlayerDataPlugin as plugin, config }
