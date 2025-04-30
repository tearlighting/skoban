import { useMove } from "@/hooks/useMove"
import type { Skoban } from "@/skoban/core"

export class ReactGameViewer implements IGameViewer {
  constructor(private _win: () => void) {}
  init(skoban: Skoban): void {
    const { addEvent, removeEvent } = useMove((direction) => skoban.move(direction))
    addEvent()
    window.onbeforeunload = () => {
      removeEvent()
    }
  }
  win() {
    this._win && this._win()
  }
}
