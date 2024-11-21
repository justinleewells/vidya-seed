class Counter {
  constructor() {
    this.value = 0
    this.timestamp = Date.now()
  }
  reset() {
    const PERIOD = 250
    let difference = Math.min(PERIOD, Date.now() - this.timestamp)
    let pct = difference / PERIOD
    this.value = 200 - 100 * pct
  }
}

export default class ScrollManager {
  constructor(inputManager) {
    this.inputManager = inputManager
    this.inputGraph = null
    this.counter = new Counter()
    this.current = null
    this.inputManager.keybind.on('commandstart', (command) => {
      if (this.inputGraph && command == 'confirm')
        this.inputGraph.current.select()
    })
  }
  setInputGraph(inputGraph) {
    this.inputGraph = inputGraph
  }
  to(inputGraphNode) {
    this.inputGraph.setCurrent(inputGraphNode)
  }
  update(delta) {
    if (!this.inputGraph) return
    this.counter.value -= delta
    if (this.counter.value > 0) return
    let direction = this.inputManager.direction.current
    if (this.current != direction) {
      this.counter = new Counter()
      this.current = direction
    }
    if (direction !== null) {
      this.inputGraph.moveInDirection(direction)
      this.counter.reset()
    }
  }
}
