import type { ECellType, EDirection } from "../../config"
import { getNextPosition } from "../../utils"

export class Ruler {
  private _map: IPosition[][]
  private _player: ICell<ECellType.Player>
  private _boxes: ICell<ECellType.Box>[]
  private _walls: ICell<ECellType.Wall>[]
  init({ map, player, boxes, walls }: { map: IPosition[][]; player: ICell<ECellType.Player>; boxes: ICell<ECellType.Box>[]; walls: ICell<ECellType.Wall>[] }) {
    this._map = map
    this._player = player
    this._boxes = boxes
    this._walls = walls
  }
  canMove(direction: EDirection) {
    const nextPosition = getNextPosition(this._player, direction)
    const res = {
      value: false,
      crashedBox: null as ICell<ECellType.Box>,
    }
    if (!this.isInMap(nextPosition)) {
      console.log("over map")
    } else if (this.isCrashWall(nextPosition)) {
      console.log("crash wall")
    } else if (this.isCrashBox(nextPosition)) {
      const crashedBox = this._boxes.find((box) => box.x === nextPosition.x && box.y === nextPosition.y)
      const crashedBoxNextPosition = getNextPosition(crashedBox, direction)
      if (!this.isInMap(crashedBoxNextPosition)) {
        console.log("crashed box over map")
      } else if (this.isCrashWall(crashedBoxNextPosition)) {
        console.log("crashed box crash wall")
      } else if (this.isCrashBox(crashedBoxNextPosition)) {
        console.log("crashed box crash box")
      } else {
        res.value = true
        res.crashedBox = crashedBox
      }
    } else {
      res.value = true
    }
    return res
  }
  isInMap(position: IPosition) {
    return position.x >= 0 && position.x < this._map.length && position.y >= 0 && position.y < this._map[0].length
  }
  isCrashWall(position: IPosition) {
    return this._walls.some((wall) => wall.x === position.x && wall.y === position.y)
  }
  isCrashBox(position: IPosition) {
    return this._boxes.some((box) => box.x === position.x && box.y === position.y)
  }
}
