import type { ECellType, EDirection } from "@/pushBox/core/config"

declare global {
  // 位置
  interface IPosition {
    x: number
    y: number
  }

  interface ICell<T extends ECellType> extends IPosition {
    type: T
  }

  interface IMove {
    move(direction: EDirection): void
  }
  interface ISkobanInitParam {
    map: ICell<ECellType>[][]
    player: ICell<ECellType.Player>
    boxes: ICell<ECellType.Box>[]
    targets: ICell<ECellType.Target>[]
  }
}
