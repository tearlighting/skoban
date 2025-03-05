import type { ECellType, EDirection } from "../../config"
import { getNextPosition } from "../../utils"

export class Ruler {
  private _map: IPosition[][]
  private _player: ICell<ECellType.Player>
  private _boxes: ICell<ECellType.Box>[]
  private _walls: ICell<ECellType.Wall>[]
  //   private _targets: Target[]
  init({
    map,
    player,
    boxes,
    walls,
  }: // targets,
  {
    map: IPosition[][]
    player: ICell<ECellType.Player>
    boxes: ICell<ECellType.Box>[]
    walls: ICell<ECellType.Wall>[]
    // targets: Target[]
  }) {
    this._map = map
    this._player = player
    this._boxes = boxes
    this._walls = walls
    // this._targets = targets
  }
  canMove(direction: EDirection) {
    const nextPosition = getNextPosition(this._player, direction)

    const res = {
      value: false,
      box: null as ICell<ECellType.Box>,
    }
    if (!this.isInMap(nextPosition)) {
      console.log("超出地图范围")
    } else if (this.isCrashWall(nextPosition)) {
      console.log("撞墙了")
    } else if (this.isCrashBox(nextPosition)) {
      const box = this._boxes.find(
        (box) => box.x === nextPosition.x && box.y === nextPosition.y
      )

      const boxNextPosition = getNextPosition(box, direction)
      if (!this.isInMap(boxNextPosition)) {
        console.log("box超出地图范围")
      } else if (this.isCrashWall(boxNextPosition)) {
        console.log("box撞墙了")
      } else if (this.isCrashBox(boxNextPosition)) {
        console.log("box撞箱子了")
      } else {
        res.value = true
        res.box = box
      }
    } else {
      res.value = true
    }
    return res
  }
  isInMap(position: IPosition) {
    return (
      position.x >= 0 &&
      position.x < this._map.length &&
      position.y >= 0 &&
      position.y < this._map[0].length
    )
  }
  isCrashWall(position: IPosition) {
    return this._walls.some(
      (wall) => wall.x === position.x && wall.y === position.y
    )
  }
  isCrashBox(position: IPosition) {
    return this._boxes.some(
      (box) => box.x === position.x && box.y === position.y
    )
  }
}
