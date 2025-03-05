//@ts-ignore
import { h } from "vue"
import { generateMap } from "@/utils"
import { useGame } from "./index"
import { levels } from "@/store"

const { initGame, cells, win } = useGame()

let current = 0
function startNextGame() {
  if (current < levels.length) {
    initGame(generateMap(levels[current]))
    current++
  }
}

startNextGame()

export default function FComponent() {
  console.log("render")
  return (
    <div class="game-container">
      <div class="mapContainer">
        {cells.value.map((cell, index) => (
          <div
            class={cell.class + " cellBlock"}
            style={cell.style}
            key={index}
          ></div>
        ))}
      </div>

      <text>{win.value ? "clear" : "playing"}</text>
      {win.value ? <button onClick={startNextGame}>next</button> : <></>}
    </div>
  )
}
