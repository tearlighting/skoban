import { ECellType } from "../../config"
import { Cell } from "./Cell"

export class Floor extends Cell<ECellType.Floor> {
  constructor(floor: IPosition) {
    super(floor, ECellType.Floor)
  }
}
