import Directions from '@enums/directions'

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
    default:
      throw new Error(`Invalid direction=${direction} does not exist.`)
  }
}

class InputGraphNode {
  constructor(value) {
    this.value = value
    this.connections = {}
  }
  addUnilateralConnection(direction, node) {
    this.connections[direction] = node
  }
  addBilateralConnection(direction, node) {
    this.connections[direction] = node
    const opposite = getOppositeDirection(direction)
    node.connections[opposite] = this
  }
  enter() {}
  exit() {}
  select() {}
}

class InputGraph {
  constructor(node) {
    this.root = node
    this.setCurrent(node)
  }
  setCurrent(node) {
    if (this.current) this.current.exit()
    this.current = node
    this.current.enter()
  }
  findNode(value) {
    let visited = new Set()
    let frontier = [this.root]
    while (frontier.length > 0) {
      let current = frontier.pop()
      if (visited.has(current)) continue
      visited.add(current)
      if (current.value == value) return current
      frontier = frontier.concat(Object.values(current.connections))
    }
    return null
  }
  moveInDirection(direction) {
    let node = this.current.connections[direction]
    if (node) this.setCurrent(node)
    return node ?? null
  }
}

export { InputGraphNode, InputGraph }
