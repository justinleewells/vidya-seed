import { EventEmitter } from 'events'

import InputTypes from '@enums/input-types'

const DEFAULT_KEYBINDS = {
  [InputTypes.KEYBOARD]: {
    32: 'confirm',
    8: 'cancel',
    13: 'menu',
    27: 'pause',
    38: 'up',
    39: 'right',
    40: 'down',
    37: 'left',
  },
  [InputTypes.GAMEPAD_SWITCH]: {
    1: 'confirm',
    0: 'cancel',
    3: 'menu',
    9: 'pause',
    12: 'up',
    15: 'right',
    13: 'down',
    14: 'left',
  },
  [InputTypes.GAMEPAD_PLAYSTATION]: {
    0: 'confirm',
    1: 'cancel',
    3: 'menu',
    9: 'pause',
    12: 'up',
    15: 'right',
    13: 'down',
    14: 'left',
  },
}

const keybinds = {}

export default class KeybindManager extends EventEmitter {
  constructor(inputManager) {
    super()
    this.inputManager = inputManager
    this.binding = null
  }
  initialize(inputType) {
    if (!keybinds[this.id])
      keybinds[this.id] = DEFAULT_KEYBINDS[inputType] ?? {}
  }
  get id() {
    return this.inputManager.inputType == InputTypes.KEYBOARD
      ? this.inputManager.inputType
      : this.inputManager.gamepad.id
  }
  get keybinds() {
    return keybinds[this.id] ?? {}
  }
  set keybinds(value) {
    keybinds[this.id] = value
  }
  startBinding(command) {
    this.binding = command
  }
  setKeybind(keycode, command) {
    if (!this.keybinds) this.keybinds = {}
    if (!this.keybinds[keycode]) {
      Object.entries(this.keybinds).forEach(([key, value]) => {
        if (value == command) delete this.keybinds[key]
      })
    } else {
      Object.entries(this.keybinds).forEach(([key, value]) => {
        if (value == command) this.keybinds[key] = this.keybinds[keycode]
      })
    }
    this.keybinds[keycode] = command
  }
  handleKeyDown(keycode) {
    if (this.binding) {
      this.setKeybind(keycode, this.binding)
      this.emit('bindfinish', this.binding)
      this.binding = null
      return
    }
    if (this.keybinds[keycode]) {
      this.emit('commandstart', this.keybinds[keycode])
    }
  }
  handleKeyUp(keycode) {
    if (this.keybinds[keycode]) {
      this.emit('commandend', this.keybinds[keycode])
    }
  }
  find(command) {
    if (this.inputManager.inputType == null) return null
    for (let key in this.keybinds) {
      if (this.keybinds[key] === command) return key
    }
    return null
  }
}
