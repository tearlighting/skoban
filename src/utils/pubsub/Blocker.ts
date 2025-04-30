export interface IBlocker<T extends string> {
  publish: (topic: T, data: any) => void
  subscribe: (topic: T, callback: (data?: any) => void) => () => void
}

export class Blocker<T extends string> implements IBlocker<T> {
  private _listeners: Map<T, Set<(data: any) => void>> = new Map()

  publish(topic: T, data: any) {
    if (this._listeners.has(topic)) {
      this._listeners.get(topic).forEach((listener) => listener(data))
    }
  }
  subscribe(topic: T, callback: (data?: any) => void) {
    if (!this._listeners.has(topic)) {
      this._listeners.set(topic, new Set())
    }
    const listeners = this._listeners.get(topic)

    listeners.add(callback)
    return () => listeners.delete(callback)
  }
}
