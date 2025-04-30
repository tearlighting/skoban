import type { ECellType } from "../../config"

export abstract class Cell<T extends ECellType> {
  private _cellInfo: ICell<T>
  protected _cellViewer: ICellViewer<T>
  constructor(position: IPosition, type: T) {
    this._cellInfo = {
      ...position,
      type,
    }
  }
  get cell(): ICell<T> {
    return this._cellInfo
  }
  set cellViewer(cellViewer: ICellViewer<T>) {
    this._cellViewer = cellViewer
    this._cellViewer?.show()
  }
  get cellViewer(): ICellViewer<T> {
    return this._cellViewer
  }
  set cell(position: IPosition) {
    Object.assign(this._cellInfo, position)
    this._cellViewer?.show()
  }
}
