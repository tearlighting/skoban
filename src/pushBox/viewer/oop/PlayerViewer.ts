import type { ECellType } from "@/pushBox/core/config"
import { CellViewer } from "./CellViewer"
import { reactive } from "vue"

export class PlayerViewer extends CellViewer {
  private _properties = reactive({
    onTarget: false,
  })
  get cell() {
    return { ...this._cell, ...this._properties }
  }
  set cell(playload: ICell<ECellType>) {
    this._cell = playload
  }
  setTarget(payload: boolean) {
    this._properties.onTarget = payload
  }
}
