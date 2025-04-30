import { useMove } from "@/hooks/useMove"
import { useSkoban } from "@/skoban"
import { onUnmounted } from "vue"

export const useGame = () => {
  const { win, cells, move, initGame } = useSkoban()
  const { addEvent, removeEvent } = useMove(move)
  addEvent()
  onUnmounted(() => {
    removeEvent()
  })
  return {
    win,
    cells,
    initGame,
  }
}
