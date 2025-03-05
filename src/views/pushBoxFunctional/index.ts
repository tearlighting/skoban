import { useMove } from "@/hooks/useMove"
import { usePushBox } from "@/pushBox"
import { onUnmounted } from "vue"

export const useGame = () => {
  const { win, cells, move, initGame } = usePushBox()
  const { addEvent, removeEvent } = useMove(move)
  addEvent()
  onUnmounted(() => {
    removeEvent
  })
  return {
    win,
    cells,
    initGame,
  }
}
