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

export function filterMapByType(
  map: IPosition[][] | IPosition[],
  type: ECellType
) {
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
  return targets.some(
    (target) => target.x === position.x && target.y === position.y
  )
}
