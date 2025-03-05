import { useMove } from "@/hooks/useMove"
import { ViewerOOP, PushBoxOOP } from "@/pushBox"
import { EDirection } from "@/pushBox/core/config"
import { getCellStyle, getImgClass, getOnTargetClass } from "@/utils"
import { computed, onUnmounted } from "vue"

export function useGame() {
  const viewer = new ViewerOOP()
  const pushBoxIns = new PushBoxOOP(viewer)

  function initGame(payload: IPushBoxInitParam) {
    pushBoxIns.init(payload)
  }
  function move(direction: EDirection) {
    pushBoxIns.move(direction)
  }

  const { addEvent, removeEvent } = useMove(move)

  addEvent()

  onUnmounted(() => {
    removeEvent()
  })
  return {
    initGame,
    cells: computed(() =>
      viewer.cells.map((cell) => {
        return {
          ...cell,
          class:
            getImgClass(cell.cell.type) + getOnTargetClass(cell.cell as any),
          style: getCellStyle(cell.cell),
        }
      })
    ),
    win: viewer.win,
  }
}
