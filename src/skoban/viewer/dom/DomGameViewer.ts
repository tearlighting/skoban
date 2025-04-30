import { useMove } from "@/hooks/useMove"
import type { Skoban } from "@/skoban/core"

export class DomGameViewer implements IGameViewer {
  constructor(private readonly _win: () => void) {}
  init(skoban: Skoban): void {
    const { addEvent, removeEvent } = useMove((direction) => skoban.move(direction))
    addEvent()
    window.onbeforeunload = () => {
      removeEvent()
    }
  }
  win() {
    this._win()
  }
}
