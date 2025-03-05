import { reactive } from "vue"
import type { ECellType } from "../config"

interface IUseCellParam<T extends ECellType> {
  position: IPosition
  cellType: T
}
export function useCell<T extends ECellType>({
  position: { x, y },
  cellType,
}: IUseCellParam<T>) {
  const cell = reactive<ICell<T>>({
    x,
    y,
    type: cellType,
  })
  return {
    cell,
  }
}
