import { computed } from "vue"
import { ECellType, EDirection } from "../config"
import { getNextPosition, isOnTarget } from "../utils"
import { useCell } from "./useCell"
interface IUseBoxParams {
  position: IPosition
  targets: ICell<ECellType.Target>[]
}
export function useBox({ position, targets }: IUseBoxParams) {
  const { cell: box } = useCell({ position, cellType: ECellType.Box })

  function move(direction: EDirection) {
    const { x, y } = getNextPosition(box, direction)
    box.x = x
    box.y = y
  }
  const onTarget = computed(() => isOnTarget(box, targets))

  return {
    box,
    move,
    onTarget,
  }
}
