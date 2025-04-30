import type { ECellType } from "@/skoban/core/config"
import { VueCellViewer } from "./VueCellViewer"

export class VuePlayerViewer extends VueCellViewer<ECellType.Player> implements ICanOntargetCell {
  private _onTarget = false
  setOnTargetStyle(onTarget: boolean): void {
    this._onTarget = onTarget
  }
  get onTarget() {
    return this._onTarget
  }
  get cellInfo() {
    const res = super.cellInfo
    return {
      ...res,
      onTarget: this._onTarget,
    }
  }
}
