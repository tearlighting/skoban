import type { PlayerViewer } from "@/pushBox/viewer/oop/PlayerViewer"
import { ECellType, type EDirection } from "../../config"
import { getNextPosition } from "../../utils"
import { Cell } from "./Cell"

export class Player extends Cell<ECellType.Player> implements IMove {
  protected declare _cellViewer: PlayerViewer

  constructor(player: IPosition) {
    super(player, ECellType.Player)
  }
  move(direction: EDirection): void {
    this.cell = getNextPosition(this.cell, direction)
  }
  moveOnTarget(playload: boolean) {
    this._cellViewer.setTarget(playload)
  }
}
