import { Plugins } from 'phaser'

const requireLocale = require.context('../../../locales', true, /.json/)

class LocalizePlugin extends Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager)
    this.locales = new Set(
      requireLocale
        .keys()
        .map((locale) => locale.replace('./', '').replace('.json', ''))
    )
    this.strings = {}
  }
  isAvailable(locale) {
    return this.locales.has(locale)
  }
  load(locale) {
    this.strings = requireLocale(`./${locale}.json`)
  }
  get(key) {
    return this.strings[key]
  }
  format(key, ...args) {
    return args.reduce(
      (str, arg, i) => str.replace(`{${i}}`, arg),
      this.strings[key]
    )
  }
}

const config = {
  type: 'global',
  key: 'LocalizePlugin',
  mapping: 'localize',
}

export { LocalizePlugin as plugin, config }
