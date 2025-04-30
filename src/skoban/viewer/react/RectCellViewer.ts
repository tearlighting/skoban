import type { ECellType } from "@/skoban/core/config"
import type { Cell } from "@/skoban/core/oop/entities/Cell"
import { ETopic, reactRenderPublisherIns } from "@/utils/pubsub"

export class ReactCellViewer<T extends ECellType> implements ICellViewer<T> {
  constructor(protected _cell: Cell<T>, public readonly type: T) {}
  show() {
    reactRenderPublisherIns.publish(ETopic.rerender, this.cellInfo)
  }
  remove(): void {
    //have no thing to do
  }
  get cellInfo() {
    return this._cell.cell
  }
}
