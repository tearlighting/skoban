import { ECellType } from "../../config"
import { Cell } from "./Cell"

export class Wall extends Cell<ECellType.Wall> {
  constructor(wall: IPosition) {
    super(wall, ECellType.Wall)
  }
}
