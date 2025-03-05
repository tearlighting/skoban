import type { ECellType } from "../../config"

export abstract class Cell<T extends ECellType> {
  private _cell: ICell<T>
  protected _cellViewer: ICellViewer
  constructor(position: IPosition, type: T) {
    this._cell = {
      ...position,
      type,
    }
  }
  get cell(): ICell<T> {
    return this._cell
  }
  set cellViewer(cellViewer: ICellViewer) {
    this._cellViewer = cellViewer
  }
  set cell(position: IPosition) {
    Object.assign(this._cell, position)
    this._cellViewer.cell = this._cell
  }
}
