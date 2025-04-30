import { ECellType, EDirection } from "../../config"
import { getNextPosition } from "../../utils"
import { Cell } from "./Cell"
export class Box extends Cell<ECellType.Box> implements IMove {
  constructor(box: IPosition) {
    super(box, ECellType.Box)
  }
  move(direction: EDirection): void {
    this.cell = getNextPosition(this.cell, direction)
  }
}
