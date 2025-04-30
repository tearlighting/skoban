import type { ECellType } from "@/skoban/core/config"
import { ReactCellViewer } from "./RectCellViewer"
import { ETopic, reactRenderPublisherIns } from "@/utils/pubsub"

export class ReactBoxViewer extends ReactCellViewer<ECellType.Box> implements ICanOntargetCell {
  private _onTarget = false
  setOnTargetStyle(onTarget: boolean): void {
    if (this._onTarget === onTarget) return
    this._onTarget = onTarget
    reactRenderPublisherIns.publish(ETopic.rerender, this.cellInfo)
  }
  get cellInfo() {
    const res = super.cellInfo
    return {
      ...res,
      onTarget: this._onTarget,
    }
  }
}
