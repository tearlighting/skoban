import type { ECellType, EDirection } from "@/pushBox/core/config"

declare global {
  interface IViewer {
    linkData2Cell(cell: ICell): void
    setWin(win: boolean): void
    init(): void
  }

  interface ICellViewer {
    set cell(value: ICell<ECellType>): void
    get cell(): ICell<ECellType>
  }
}
