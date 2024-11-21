import Phaser from 'phaser'

const REVERSE_KEYCODE_MAP = Object.entries(
  Phaser.Input.Keyboard.KeyCodes
).reduce((result, [key, value]) => {
  result[value] = key
  return result
}, {})

const getKeyName = (keycode) => {
  let name = REVERSE_KEYCODE_MAP[keycode].toLowerCase().replace('_', ' ')
  return name[0].toUpperCase() + name.slice(1)
}

export { getKeyName }
