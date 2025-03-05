import { ECellType } from "../../config"
import { Cell } from "./Cell"

export class Target extends Cell<ECellType.Target> {
  constructor(target: IPosition) {
    super(target, ECellType.Target)
  }
}
