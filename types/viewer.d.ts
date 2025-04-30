import type { ECellType, EDirection } from "@/pushBox/core/config"
import type { Skoban } from "@/skoban/core/oop"

declare global {
  interface IGameViewer {
    init(skoban: Skoban): void
    win(): void
  }

  interface ICanOntargetCell {
    setOnTargetStyle(onTarget: boolean): void
  }
  interface ICellViewer<T extends ECellType> {
    show(): void
    remove(): void
  }
}
