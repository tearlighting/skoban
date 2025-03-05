import { ECellType, type EDirection } from "../config"
import { Box } from "./entities/Box"
import { Floor } from "./entities/Floor"
import { Player } from "./entities/Player"
import { Ruler } from "./ruler/Ruler"
import { Target } from "./entities/Target"
import { Wall } from "./entities/Wall"
import { filterMapByType, isOnTarget } from "../utils"

export class PushBox {
  private _map: IPosition[][]
  private _player: Player
  private _boxes: Box[]
  private _walls: Wall[]
  private _targets: Target[]
  private _floors: Floor[]
  private _isWin: boolean

  private _ruler: Ruler

  constructor(private _viewer: IViewer) {
    this._ruler = new Ruler()
  }
  init({ map, player, boxes, targets }: IPushBoxInitParam) {
    this._viewer.init()
    this._map = map
    this._player = new Player(player)
    this._viewer.linkData2Cell(this._player)
    this._boxes = boxes.map((pos) => {
      const box = new Box(pos)
      this._viewer.linkData2Cell(box)
      return box
    })
    this._walls = filterMapByType(map, ECellType.Wall).map((pos) => {
      const wall = new Wall(pos)
      this._viewer.linkData2Cell(wall)
      return wall
    })
    this._targets = targets.map((pos) => {
      const target = new Target(pos)
      this._viewer.linkData2Cell(target)
      return target
    })
    this._floors = filterMapByType(map, ECellType.Floor).map((p) => {
      const floor = new Floor(p)
      this._viewer.linkData2Cell(floor)
      return floor
    })
    this._ruler.init({
      player: this._player.cell,
      boxes: this._boxes.map((box) => box.cell),
      walls: this._walls.map((wall) => wall.cell),
      map: this._map,
    })
  }

  move(direction: EDirection) {
    const { value, box } = this._ruler.canMove(direction)
    if (value) {
      this._player.move(direction)
      const targets = this._targets.map((target) => target.cell)
      this._player.moveOnTarget(isOnTarget(this._player.cell, targets))
      if (box) {
        const boxIns = this._boxes.find(
          (b) => b.cell.x === box.x && b.cell.y === box.y
        )
        boxIns.move(direction)
        const boxOntarget = isOnTarget(boxIns.cell, targets)
        boxIns.moveOnTarget(boxOntarget)
        if (boxOntarget) {
          this.checkWin()
        }
      }
    }
  }
  checkWin() {
    // 检查是否所有箱子都在目标位置
    const win = this._boxes.every((box) =>
      this._targets.some(
        (target) => target.cell.x === box.cell.x && target.cell.y === box.cell.y
      )
    )
    if (win != this._isWin) {
      this._isWin = win
      this._viewer.setWin(win)
      if (win) {
        console.log("win")
      }
    }
  }
}
