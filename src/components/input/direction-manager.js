import Directions from '@enums/directions'
import InputTypes from '@enums/input-types'

const STICK_THRESHOLD = 0.15

const getStickDirection = (stick) => {
  const x = Math.abs(stick.x) >= STICK_THRESHOLD ? Math.abs(stick.x) : 0
  const y = Math.abs(stick.y) >= STICK_THRESHOLD ? Math.abs(stick.y) : 0
  if (x == 0 && y == 0) return null
  if (x > y) {
    if (stick.x > 0) return Directions.RIGHT
    else return Directions.LEFT
  } else {
    if (stick.y > 0) return Directions.DOWN
    else return Directions.UP
  }
}

export default class DirectionManager {
  constructor(inputManager) {
    this.inputManager = inputManager
    this.keyDirection = null
    this.stickDirection = null
    inputManager.keybind.on('commandstart', this.handleCommandStart.bind(this))
    inputManager.keybind.on('commandend', this.handleCommandEnd.bind(this))
  }
  get current() {
    return this.keyDirection ?? this.stickDirection
  }
  handleCommandStart(command) {
    switch (command) {
      case 'up':
        this.keyDirection = Directions.UP
        break
      case 'right':
        this.keyDirection = Directions.RIGHT
        break
      case 'down':
        this.keyDirection = Directions.DOWN
        break
      case 'left':
        this.keyDirection = Directions.LEFT
        break
    }
  }
  handleCommandEnd(command) {
    switch (command) {
      case 'up':
        if (this.keyDirection == Directions.UP) this.keyDirection = null
        break
      case 'right':
        if (this.keyDirection == Directions.RIGHT) this.keyDirection = null
        break
      case 'down':
        if (this.keyDirection == Directions.DOWN) this.keyDirection = null
        break
      case 'left':
        if (this.keyDirection == Directions.LEFT) this.keyDirection = null
        break
    }
  }
  update(delta) {
    if (this.inputManager.inputType > InputTypes.KEYBOARD) {
      this.stickDirection = getStickDirection(
        this.inputManager.gamepad.leftStick
      )
    }
  }
}
