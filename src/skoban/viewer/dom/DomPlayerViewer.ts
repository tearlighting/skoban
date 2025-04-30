import type { ECellType } from "@/skoban/core/config"
import { DomCellViewer } from "./DomCellViewer"
import { getOnTargetClass } from "@/utils"

export class DomPlayerViewer extends DomCellViewer<ECellType.Player> implements ICanOntargetCell {
  public setOnTargetStyle(onTarget: boolean) {
    const res = getOnTargetClass({ onTarget: true })
    if (onTarget) {
      this._element.classList.add(res.trim())
    } else {
      this._element.classList.remove(res.trim())
    }
  }
}
