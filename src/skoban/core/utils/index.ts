import { ECellType, EDirection } from "../config"

export function getNextPosition(position: IPosition, direction: EDirection) {
  const newPosition = {
    ...position,
  }
  const strategy = {
    [EDirection.Up]: () => newPosition.y--,
    [EDirection.Down]: () => newPosition.y++,
    [EDirection.Left]: () => newPosition.x--,
    [EDirection.Right]: () => newPosition.x++,
  }
  strategy[direction]()

  return newPosition
}

export function filterMapByType(map: IPosition[][] | IPosition[], type: ECellType) {
  const res: IPosition[] = []

  map.forEach((cell) => {
    if (Array.isArray(cell)) {
      res.push(...filterMapByType(cell, type))
    } else {
      if (cell.type === type) {
        res.push(cell)
      }
    }
  })
  return res
}

export function isOnTarget(position: IPosition, targets: IPosition[]) {
  return targets.some((target) => target.x === position.x && target.y === position.y)
}

export function deepClone<T>(obj: T, seen = new WeakMap()): T {
  if (obj === null || typeof obj !== "object") return obj

  if (seen.has(obj)) return seen.get(obj)

  if (Array.isArray(obj)) {
    const res = [] as any[]
    seen.set(obj, res)
    for (const item of obj) {
      res.push(deepClone(item, seen))
    }
    return res as any
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any
  }

  const res = {} as any
  seen.set(obj, res)
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res[key] = deepClone(obj[key], seen)
    }
  }
  return res
}
