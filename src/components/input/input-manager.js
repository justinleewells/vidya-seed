import InputTypes from '@enums/input-types'

import DirectionManager from './direction-manager'
import KeybindManager from './keybind-manager'
import ScrollManager from './scroll-manager'

const getGamepadType = (gamepad) => {
  if (gamepad.id.includes('Pro Controller')) return InputTypes.GAMEPAD_SWITCH
  if (gamepad.id.includes('DualSense Wireless Controller'))
    return InputTypes.GAMEPAD_PLAYSTATION
  return InputTypes.GAMEPAD_CUSTOM
}

export default class InputManager {
  constructor() {
    this.inputType = null
    this.gamepad = null
    this.keybind = new KeybindManager(this)
    this.direction = new DirectionManager(this)
    this.scroll = new ScrollManager(this)
  }
  setGamepad(gamepad) {
    this.gamepad = gamepad
    this.inputType = getGamepadType(gamepad)
    this.keybind.initialize(this.inputType)
    gamepad.on('down', this.keybind.handleKeyDown.bind(this.keybind))
    gamepad.on('up', this.keybind.handleKeyUp.bind(this.keybind))
  }
  setKeyboard(keyboard) {
    this.inputType = InputTypes.KEYBOARD
    this.keybind.initialize(this.inputType)
    keyboard.on('keydown', (key) => this.keybind.handleKeyDown(key.keyCode))
    keyboard.on('keyup', (key) => this.keybind.handleKeyUp(key.keyCode))
  }
  update(timestamp, delta) {
    this.direction.update(delta)
    this.scroll.update(delta)
  }
}
