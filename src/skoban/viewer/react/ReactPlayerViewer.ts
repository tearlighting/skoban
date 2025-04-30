import type { ECellType } from "@/skoban/core/config"
import { ReactCellViewer } from "./RectCellViewer"
import { ETopic, reactRenderPublisherIns } from "@/utils/pubsub"

export class ReactPlayerViewer extends ReactCellViewer<ECellType.Player> implements ICanOntargetCell {
  private _onTarget = false
  setOnTargetStyle(onTarget: boolean): void {
    if (this._onTarget === onTarget) return
    this._onTarget = onTarget
    reactRenderPublisherIns.publish(ETopic.rerender, this.cellInfo)
  }
  get cellInfo() {
    const res = {
      ...super.cellInfo,
      onTarget: this._onTarget,
    }

    return res
  }
}
