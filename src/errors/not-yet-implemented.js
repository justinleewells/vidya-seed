export default class NotYetImplementedError extends Error {
  constructor(object, method) {
    super(`${object.constructor.name}.${method}()`)
  }
}
