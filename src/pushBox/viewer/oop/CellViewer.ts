import type { ECellType } from "../../core/config"

export class CellViewer implements ICellViewer {
  protected _cell: ICell<ECellType> = {} as ICell<ECellType>
  public set cell(value: ICell<ECellType>) {
    Object.assign(this._cell, value)
  }
  get cell() {
    return this._cell
  }
}
