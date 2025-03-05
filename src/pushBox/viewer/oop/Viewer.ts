import { reactive, ref } from "vue"
import { ECellType } from "../../core/config"
import type { Cell } from "@/pushBox/core/oop/entities/Cell"
import { CellViewer } from "./CellViewer"
import { PlayerViewer } from "./PlayerViewer"
import { BoxViewer } from "./BoxViewer"

export class Viewer implements IViewer {
  private _cells: ICellViewer[] = reactive([])
  private _win = ref(false)
  linkData2Cell(cell: Cell<ECellType>): void {
    let cellViewer: ICellViewer
    switch (cell.cell.type) {
      case ECellType.Player:
        cellViewer = reactive(new PlayerViewer())
        break
      case ECellType.Box:
        cellViewer = reactive(new BoxViewer())
        break
      default:
        cellViewer = reactive(new CellViewer())
    }
    cell.cellViewer = cellViewer
    cell.cell = cell.cell
    this._cells.push(cellViewer)
  }
  setWin(win: boolean): void {
    // throw new Error("Method not implemented.")
    this._win.value = win
  }
  init(): void {
    this._cells.splice(0, this._cells.length)
    this._win.value = false
  }
  get cells() {
    return this._cells
  }
  get win() {
    return this._win
  }
}
