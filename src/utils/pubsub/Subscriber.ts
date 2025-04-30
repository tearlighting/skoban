import type { IBlocker } from "./Blocker"

export interface ISubscriber<T extends string> {
  subscribe(topic: T, callback: Function): void
}
export class Subscriber<T extends string> implements ISubscriber<T> {
  constructor(private _blocker: IBlocker<T>) {}

  subscribe(topic: T, callback: (data?: any) => void) {
    return this._blocker.subscribe(topic, callback)
  }
}
