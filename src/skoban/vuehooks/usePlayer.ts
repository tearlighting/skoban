import { computed } from "vue"
import { ECellType, type EDirection } from "../core/config"
import { getNextPosition, isOnTarget } from "../core/utils"
import { useCell } from "./useCell"

interface IUsePlayerParams {
  position: IPosition
  targets: ICell<ECellType.Target>[]
}
export function usePlayer({ position, targets }: IUsePlayerParams) {
  const { cell: player } = useCell({
    position,
    cellType: ECellType.Player,
  })
  function move(direction: EDirection) {
    const { x, y } = getNextPosition(player, direction)
    player.x = x
    player.y = y
  }

  const onTarget = computed(() => isOnTarget(player, targets))

  return {
    player,
    move,
    onTarget,
  }
}
