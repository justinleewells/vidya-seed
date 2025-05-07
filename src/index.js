import './style.css'

// Require all the scenes.
const requireScene = require.context('./scenes/', true, /\/scene\.js$/)
let scenes = []
requireScene
  .keys()
  .forEach((key) => scenes.push(new (requireScene(key).default)()))

// Swap LoadingScene to the front of the array so it is started first.
for (let i = 1; i < scenes.length; i++) {
  if (scenes[i].sys.config == 'LoadingScene') {
    let tmp = scenes[0]
    scenes[0] = scenes[i]
    scenes[i] = tmp
  }
}

// Require and configure plugins.
const requirePlugin = require.context('./plugins/', true, /\/index\.js$/)
const plugins = { global: [], scene: [] }
requirePlugin.keys().forEach((key) => {
  const { plugin, config } = requirePlugin(key)
  plugins[config.type].push({
    plugin,
    key: config.key,
    mapping: config.mapping,
  })
})

// Start the game.
new Phaser.Game({
  type: Phaser.AUTO,
  pixelArt: true,
  width: 800,
  height: 600,
  scene: scenes,
  plugins,
  scale: {
    parent: 'game',
    zoom: 1,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
})
