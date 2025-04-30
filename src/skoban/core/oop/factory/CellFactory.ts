import type { IViewerFactory } from "@/skoban/viewer/factory/IViewerFactory"
import { Box } from "../entities/Box"
import { ECellType } from "../../config"
import { Target } from "../entities/Target"
import { Player } from "../entities/Player"
import { Floor } from "../entities/Floor"
import { Wall } from "../entities/Wall"

export class CellFactory {
  constructor(private _viewerFactory: IViewerFactory) {}
  createBox(box: IPosition): Box {
    const boxIns = new Box(box)
    boxIns.cellViewer = this._viewerFactory.createBox(boxIns, ECellType.Box)
    return boxIns
  }
  createTarget(target: IPosition): Target {
    const targetIns = new Target(target)
    targetIns.cellViewer = this._viewerFactory.createTarget(targetIns, ECellType.Target)
    return targetIns
  }
  createPlayer(player: IPosition): Player {
    const playerIns = new Player(player)
    playerIns.cellViewer = this._viewerFactory.createPlayer(playerIns, ECellType.Player)
    // console.log(playerIns)
    return playerIns
  }
  createFloor(floor: IPosition) {
    const floorIns = new Floor(floor)
    floorIns.cellViewer = this._viewerFactory.createFloor(floorIns, ECellType.Floor)
    return floorIns
  }
  createWall(wall: IPosition) {
    const wallIns = new Wall(wall)
    wallIns.cellViewer = this._viewerFactory.createWall(wallIns, ECellType.Wall)
    return wallIns
  }
}
