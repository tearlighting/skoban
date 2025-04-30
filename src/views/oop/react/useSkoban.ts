import { useGameLevel } from "@/hooks/useGameLevel"
import { Skoban } from "@/skoban"
import type { ECellType } from "@/skoban/core/config"
import { ReactViewerFactory } from "@/skoban/viewer/factory/ReactViewerFactory"
import { ReactGameViewer } from "@/skoban/viewer/react/ReactGameViewer"
import type { ReactPlayerViewer } from "@/skoban/viewer/react/ReactPlayerViewer"
import type { ReactCellViewer } from "@/skoban/viewer/react/RectCellViewer"
import { getCellStyle, getImgClass, getOnTargetClass } from "@/utils"
import { ETopic, reactRenderPublisherIns, reactRenderSubscriberIns } from "@/utils/pubsub"
import { useMemo, useSyncExternalStore } from "react"

function createUseSkoban() {
  const { hasNextLevel, nextLevel, getCurrentMap } = useGameLevel()

  const skobanViewerIns = new ReactGameViewer(win)
  const skobanCellViewerFactoryIns = new ReactViewerFactory()
  const skobanIns = new Skoban(skobanViewerIns, skobanCellViewerFactoryIns)

  function win() {
    reactRenderPublisherIns.publish(ETopic.rerender)
  }

  let gameInfolast = {
    cells: [],
    win: false,
  } as {
    cells: { x: number; y: number; type: ECellType }[]
    win: boolean
  }

  function getshapshot() {
    const res = toSnapshot(skobanIns.gameInfo)
    if (!deepEqual(res, gameInfolast)) {
      gameInfolast = res
    }
    return gameInfolast
  }

  reset()

  function reset() {
    skobanIns.init(getCurrentMap())
    reactRenderPublisherIns.publish(ETopic.rerender)
  }
  function next() {
    if (hasNextLevel()) {
      nextLevel()
      reset()
    }
  }
  return function useSkoban() {
    const gameInfo = useSyncExternalStore((callback) => reactRenderSubscriberIns.subscribe(ETopic.rerender, callback), getshapshot)

    const renderData = useMemo(() => {
      return gameInfo.cells.map((cell) => getRenderData(cell))
    }, [gameInfo])

    const win = useMemo(() => gameInfo.win, [gameInfo.win])
    return {
      renderData,
      win,
      next,
      reset,
      hasNextLevel,
    }
  }
}

//#region
export function deepEqual(a: any, b: any, seen = new WeakMap()): boolean {
  if (Object.is(a, b)) return true

  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
    return false
  }

  if (seen.has(a) && seen.get(a) === b) {
    return true
  }
  seen.set(a, b)

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime()
  }

  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false
    for (const [key, val] of a) {
      if (!b.has(key) || !deepEqual(val, b.get(key), seen)) return false
    }
    return true
  }

  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false
    for (const val of a) {
      if (![...b].some((bVal) => deepEqual(val, bVal, seen))) return false
    }
    return true
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    return a.every((item, i) => deepEqual(item, b[i], seen))
  }

  const aKeys = Reflect.ownKeys(a)
  const bKeys = Reflect.ownKeys(b)
  if (aKeys.length !== bKeys.length) return false

  return aKeys.every((key) => deepEqual(a[key], b[key], seen))
}

function getRenderData(paylaod: IPosition & { type: ECellType; onTarget?: boolean }) {
  const { onTarget = false, type } = paylaod
  return {
    class: getImgClass(type) + getOnTargetClass({ onTarget }),
    style: getCellStyle(paylaod),
  }
}
function extractCells(viewers?: ReactCellViewer<any>[]) {
  return viewers?.map((v) => v.cellInfo) ?? []
}
function toSnapshot(info: Record<keyof Skoban["gameInfo"], any>) {
  const player = (info.player as ReactPlayerViewer | null)?.cellInfo
  return {
    cells: [...(player ? [player] : []), ...extractCells(info.boxes), ...extractCells(info.floors), ...extractCells(info.walls), ...extractCells(info.targets)],
    win: info.win,
  }
}
//#endregion
export const useSkoban = createUseSkoban()
