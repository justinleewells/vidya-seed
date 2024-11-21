// The EventBus plays a huge role in the way I develop video
// games. Core logic is defined through executors, while handlers
// implements a wide range of functionality such as modifying events
// or updating the UI based on the result of an event.
export default class EventBus {
  constructor(scene) {
    this.scene = scene
    this.executors = {}
    this.handlers = {}
  }
  addHandler(stage, type, handler) {
    if (!this.handlers[type]) this.handlers[type] = {}
    if (!this.handlers[type][stage]) this.handlers[type][stage] = []
    this.handlers[type][stage].push(handler)
  }
  removeHandler(stage, type, handler) {
    let index = this.handlers[type][stage].indexOf(handler)
    this.handlers[type][stage].splice(index, 1)
  }
  async try(stage, event) {
    let handlers = this.handlers[event.type]?.[stage]
    if (!handlers) return
    for (let i = 0; i < handlers.length; i++) {
      await handlers[i](this.scene, event)
    }
  }
  async run(event) {
    await this.try('transform', event)
    await this.try('modify', event)
    await this.try('cancel', event)
    await this.try('before', event)
    if (!event.canceled) {
      await this.try('start', event)
      await this.executors[event.type](event)
      // This seems weird, but I've encountered situations
      // where it makes the most sense to cancel an event from
      // an executor and return early.
      if (!event.canceled) await this.try('finish', event)
    }
    await this.try('after', event)
  }
}
