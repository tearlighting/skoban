import type { IBlocker } from "./Blocker"

export interface IPublisher<T extends string> {
  publish(topic: T, data: any): void
}

export class Publisher<TTopic extends string> implements IPublisher<TTopic> {
  constructor(private _blocker: IBlocker<TTopic>) {}
  publish(topic: TTopic, data?: any): void {
    this._blocker.publish(topic, data)
  }
}
