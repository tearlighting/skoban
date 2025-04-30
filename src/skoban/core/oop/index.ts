import { ECellType, type EDirection } from "../config"
import { Box } from "./entities/Box"
import { Floor } from "./entities/Floor"
import { Player } from "./entities/Player"
import { Ruler } from "./ruler/Ruler"
import { Target } from "./entities/Target"
import { Wall } from "./entities/Wall"
import { deepClone, filterMapByType, isOnTarget } from "../utils"
import type { IViewerFactory } from "@/skoban/viewer/factory/IViewerFactory"
import { CellFactory } from "./factory/CellFactory"

export class Skoban {
  private _map: IPosition[][]
  private _player: Player
  private _boxes: Box[]
  private _walls: Wall[]
  private _targets: Target[]
  private _floors: Floor[]
  private _isWin: boolean

  private _ruler: Ruler
  private _cellFactory: CellFactory

  constructor(private _gameViewer: IGameViewer, private _cellViewerFactory: IViewerFactory) {
    this._ruler = new Ruler()
    this._cellFactory = new CellFactory(this._cellViewerFactory)
    this._isWin = false
    this._gameViewer.init(this)
  }
  init({ map, player, boxes, targets }: ISkobanInitParam) {
    this.removeCurrentCells()
    this._map = map
    this._player = this._cellFactory.createPlayer(player)

    this._boxes = boxes.map((pos) => this._cellFactory.createBox(pos))
    this._walls = filterMapByType(map, ECellType.Wall).map((pos) => this._cellFactory.createWall(pos))
    this._targets = targets.map((pos) => this._cellFactory.createTarget(pos))
    this._floors = filterMapByType(map, ECellType.Floor).map((pos) => this._cellFactory.createFloor(pos))
    this._ruler.init({
      player: this._player.cell,
      boxes: this._boxes.map((box) => box.cell),
      walls: this._walls.map((wall) => wall.cell),
      map: this._map,
    })
  }
  private removeCurrentCells() {
    this._player?.cellViewer?.remove()
    this._boxes?.forEach((box) => box.cellViewer?.remove())
    this._walls?.forEach((wall) => wall.cellViewer?.remove())
    this._targets?.forEach((target) => target.cellViewer?.remove())
    this._floors?.forEach((floor) => floor.cellViewer?.remove())
  }

  move(direction: EDirection) {
    const { value, crashedBox } = this._ruler.canMove(direction)
    if (value) {
      this._player.move(direction)
      const targets = this._targets.map((target) => target.cell)
      //   console.log(this._player)
      ;(this._player.cellViewer as any as ICanOntargetCell).setOnTargetStyle(isOnTarget(this._player.cell, targets))
      if (crashedBox) {
        const boxIns = this._boxes.find((b) => b.cell.x === crashedBox.x && b.cell.y === crashedBox.y)
        boxIns.move(direction)
        const boxOntarget = isOnTarget(boxIns.cell, targets)
        ;(boxIns.cellViewer as any as ICanOntargetCell).setOnTargetStyle(boxOntarget)
        if (boxOntarget) {
          this.checkWin()
        }
      }
    }
  }
  private checkWin() {
    // 检查是否所有箱子都在目标位置
    const win = this._boxes.every((box) => this._targets.some((target) => target.cell.x === box.cell.x && target.cell.y === box.cell.y))
    if (win !== this._isWin) {
      this._isWin = win
      win && this._gameViewer.win()
      if (win) {
        console.log("win")
      }
    }
  }
  get gameInfo() {
    const res = {
      player: this._player?.cellViewer,
      boxes: this._boxes?.map((box) => box.cellViewer),
      walls: this._walls?.map((wall) => wall.cellViewer),
      targets: this._targets?.map((target) => target.cellViewer),
      floors: this._floors?.map((floor) => floor.cellViewer),
      win: this._isWin,
      //   map: this._map,
    }
    return { ...res }
  }
}
