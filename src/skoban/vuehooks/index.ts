import { computed, reactive, type Reactive } from "vue"
import { ECellType, EDirection } from "../core/config"
import { useTarget } from "./useTarget"
import { usePlayer } from "./usePlayer"
import { useBox } from "./useBox"
import { useWall } from "./useWall"
import { useFloor } from "./useFloor"
import { filterMapByType } from "../core/utils"
import { Ruler } from "../core/oop/ruler/Ruler"
import { getCellStyle, getImgClass, getOnTargetClass } from "@/utils"

interface IPushBoxGameData {
  player: ReturnType<typeof usePlayer>
  boxes: ReturnType<typeof useBox>[]
  targets: ReturnType<typeof useTarget>[]
  walls: ReturnType<typeof useWall>[]
  floors: ReturnType<typeof useFloor>[]
}
export function usePushBox() {
  const gameData = reactive<IPushBoxGameData>({
    player: null,
    boxes: [],
    targets: [],
    walls: [],
    floors: [],
  })

  const rulerIns = new Ruler()
  function initGame({ map, player, boxes, targets }: ISkobanInitParam) {
    gameData.targets = targets.map((t) => useTarget({ position: t }))
    const targetsReactive = gameData.targets.map((t) => t.target)
    gameData.player = usePlayer({
      position: player,
      targets: targetsReactive,
    }) as any
    gameData.boxes = boxes.map((b) => useBox({ position: b, targets: targetsReactive })) as any
    // const { onTarget } = gameData.boxes[0]
    // console.log("raw", onTarget)

    gameData.walls = filterMapByType(map, ECellType.Wall).map((w) => useWall({ position: w }))
    gameData.floors = filterMapByType(map, ECellType.Floor).map((f) => useFloor({ position: f }))
    rulerIns.init({
      player: gameData.player.player,
      boxes: gameData.boxes.map((b) => b.box),
      walls: gameData.walls.map((w) => w.wall),
      map,
    })
  }

  const renderData = computed(() => [
    getPlayerRenderData(gameData.player),
    ...gameData.boxes.map((b) => getBoxRenderData(b)),
    ...gameData.targets.map((t) => getTargetRenderData(t)),
    ...gameData.walls.map((w) => getWallRenderData(w)),
    ...gameData.floors.map((f) => getFloorRenderData(f)),
  ])

  const win = computed(() => gameData.boxes.every((t) => t.onTarget))
  function move(direction: EDirection) {
    // rulerIns.move(direction)
    const { value, crashedBox: box } = rulerIns.canMove(direction)
    if (value) {
      gameData.player.move(direction)
      if (box) {
        gameData.boxes.find((b) => b.box === box).move(direction)
      }
    }
  }

  return {
    initGame,
    cells: renderData,
    move,
    win,
  }
}

function getPlayerRenderData(playerStore: Reactive<IPushBoxGameData["player"]>) {
  if (!playerStore) return {}
  const { player: cell, onTarget } = playerStore
  return {
    class: getImgClass(cell.type) + getOnTargetClass({ onTarget: onTarget as any }),
    style: getCellStyle(cell),
  }
}

function getBoxRenderData(boxStore: Reactive<IPushBoxGameData["boxes"][number]>) {
  const { box: cell, onTarget } = boxStore
  return {
    class: getImgClass(cell.type) + getOnTargetClass({ onTarget: onTarget as any }),
    style: getCellStyle(cell),
  }
}

function getTargetRenderData(targetStore: Reactive<IPushBoxGameData["targets"][number]>) {
  const { target: cell } = targetStore
  return {
    class: getImgClass(cell.type),
    style: getCellStyle(cell),
  }
}
function getWallRenderData(wallStore: Reactive<IPushBoxGameData["walls"][number]>) {
  const { wall: cell } = wallStore
  return {
    class: getImgClass(cell.type),
    style: getCellStyle(cell),
  }
}

function getFloorRenderData(floorStore: Reactive<IPushBoxGameData["floors"][number]>) {
  const { floor: cell } = floorStore
  return {
    class: getImgClass(cell.type),
    style: getCellStyle(cell),
  }
}
