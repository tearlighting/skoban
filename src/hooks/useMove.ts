import { EDirection } from "@/skoban/core/config"

export function useMove(move: (direction: EDirection) => void) {
  function keydownHandler(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowUp":
        move(EDirection.Up)
        break
      case "ArrowDown":
        move(EDirection.Down)
        break
      case "ArrowLeft":
        move(EDirection.Left)
        break
      case "ArrowRight":
        move(EDirection.Right)
        break
    }
  }

  function addEvent() {
    window.addEventListener("keydown", keydownHandler)
  }
  function removeEvent() {
    window.removeEventListener("keydown", keydownHandler)
  }
  return {
    addEvent,
    removeEvent,
  }
}
