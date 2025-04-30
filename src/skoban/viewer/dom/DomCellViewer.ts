import { getCellStyle, getImgClass } from "@/utils"
import type { ECellType } from "../../core/config"
import type { Cell } from "@/skoban/core/oop/entities/Cell"

export class DomCellViewer<T extends ECellType> implements ICellViewer<T> {
  protected _element: HTMLElement = null

  constructor(protected _cell: Cell<T>, public readonly type: T, protected _parent: HTMLElement) {
    this._element = document.createElement("div")
    this._element.classList.add("cellBlock", getImgClass(this.type))
    _parent.appendChild(this._element)
  }
  get cell() {
    return this._cell
  }
  set cell(cell: Cell<T>) {
    this._cell = cell
  }

  show() {
    this._element.style.transform = (getCellStyle(this.cell.cell) as any).transform
  }

  remove() {
    this._element.remove()
  }
}
