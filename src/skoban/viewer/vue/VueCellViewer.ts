import type { ECellType } from "@/skoban/core/config"
import type { Cell } from "@/skoban/core/oop/entities/Cell"
import { deepClone } from "@/skoban/core/utils"
//因为Viewer整体（this运行时变成了proxy）是响应式数据，这里的数据就不加Reactive了
export class VueCellViewer<T extends ECellType> implements ICellViewer<T> {
  protected _cellInfo: Cell<T>["cell"]
  constructor(protected _cell: Cell<T>, public readonly type: T) {
    this._cellInfo = deepClone(_cell.cell)
  }
  show() {
    for (let i in this._cell.cell) {
      if (this._cellInfo[i] !== this._cell.cell[i]) {
        this._cellInfo[i] = this._cell.cell[i]
      }
    }
  }
  remove(): void {
    //have no thing to do
  }
  get cellInfo() {
    return this._cellInfo
  }
}
