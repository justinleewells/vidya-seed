import Directions from '@enums/directions'
import NotYetImplementedError from '@errors/not-yet-implemented'
import { Plugins } from 'phaser'

const getOppositeDirection = (direction) => {
  switch (direction) {
    case Directions.UP:
      return Directions.DOWN
    case Directions.RIGHT:
      return Directions.LEFT
    case Directions.DOWN:
      return Directions.UP
    case Directions.LEFT:
      return Directions.RIGHT
  }
}

class InputGraphNode {
  constructor() {
    this.map = {}
  }
  connect(direction, node, oneWay) {
    this.map[direction] = node
    if (!oneWay) node.map[getOppositeDirection(direction)] = this
  }
  select() {
    throw new NotYetImplementedError(this, 'select')
  }
  enter() {
    throw new NotYetImplementedError(this, 'enter')
  }
  exit() {
    throw new NotYetImplementedError(this, 'exit')
  }
  destroy() {
    throw new NotYetImplementedError(this, 'destroy')
  }
}

class InputGraph {
  constructor(root, current) {
    this.root = root
    this.current = current ?? root
    this.current.enter()
  }
  move(direction) {
    if (!this.current.map[direction]) return
    this.enter(this.current.map[direction])
  }
  enter(node) {
    this.current.exit()
    this.current = node
    this.current.enter()
  }
  destroy() {
    this.root = undefined
    this.current = undefined
  }
}

class InputGraphPlugin extends Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager)
    this.inputGraph = null
  }
  set(inputGraph) {
    this.inputGraph = inputGraph
  }
  handleKeyDown({ key }) {
    switch (key) {
      case 'ArrowUp':
        this.inputGraph.move(Directions.UP)
        break
      case 'ArrowRight':
        this.inputGraph.move(Directions.RIGHT)
        break
      case 'ArrowDown':
        this.inputGraph.move(Directions.DOWN)
        break
      case 'ArrowLeft':
        this.inputGraph.move(Directions.LEFT)
        break
    }
  }
  // Lifecycle
  boot() {
    this.systems.events.on('destroy', this.destroy, this)
    this.systems.events.on('start', this.start, this)
  }
  destroy() {
    super.destroy()
    this.inputGraph = undefined
  }
  start() {
    const { keyboard } = this.scene.input
    keyboard.on('keydown', this.handleKeyDown.bind(this))
  }
}

const config = {
  type: 'scene',
  key: 'InputGraphPlugin',
  mapping: 'inputGraph',
}

export { InputGraphNode, InputGraph, InputGraphPlugin as plugin, config }
