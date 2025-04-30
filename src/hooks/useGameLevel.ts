import { generateMap } from "@/utils"
import { levels } from "@/store"

export function useGameLevel() {
  let currentLevel = 0

  function hasNextLevel() {
    return currentLevel < levels.length - 1
  }

  function getCurrentMap() {
    return generateMap(levels[currentLevel])
  }
  function nextLevel() {
    currentLevel++
  }
  return {
    hasNextLevel,
    getCurrentMap,
    nextLevel,
  }
}
