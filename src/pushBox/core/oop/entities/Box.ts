import type { BoxViewer } from "@/pushBox/viewer/oop/BoxViewer"
import { ECellType, EDirection } from "../../config"
import { getNextPosition } from "../../utils"
import { Cell } from "./Cell"
export class Box extends Cell<ECellType.Box> implements IMove {
  protected declare _cellViewer: BoxViewer
  constructor(box: IPosition) {
    super(box, ECellType.Box)
  }
  move(direction: EDirection): void {
    this.cell = getNextPosition(this.cell, direction)
  }
  moveOnTarget(playload: boolean) {
    this._cellViewer.setTarget(playload)
  }
}
