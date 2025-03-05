import { ECellType } from "@/pushBox/core/config"
import type { levels } from "@/store"
import type { StyleValue } from "vue"

export function generateMap({
  map,
  player,
  targets,
  boxes,
}: (typeof levels)[0]) {
  enum CellType {
    Wall = 0,
    floor,
  }
  function generateCell(x, y, type: ECellType) {
    return {
      type,
      x,
      y,
    }
  }
  return {
    map: map.map((row, columnIndex) =>
      row.map((cell, rowIndex) => {
        let type: ECellType
        switch (cell) {
          case CellType.Wall:
            type = ECellType.Wall
            break
          case CellType.floor:
            type = ECellType.Floor
            break
        }
        return generateCell(rowIndex, columnIndex, type)
      })
    ) as ICell<ECellType>[][],
    player: generateCell(
      ...player,
      ECellType.Player
    ) as ICell<ECellType.Player>,
    targets: targets.map(([x, y]) =>
      generateCell(x, y, ECellType.Target)
    ) as ICell<ECellType.Target>[],
    boxes: boxes.map(([x, y]) =>
      generateCell(x, y, ECellType.Box)
    ) as ICell<ECellType.Box>[],
  }
}

export function getImgClass(type: ECellType) {
  switch (type) {
    case ECellType.Box:
      return "cargo"
    case ECellType.Target:
      return "target"
    case ECellType.Player:
      return "keeper"
    case ECellType.Floor:
      return "floor"
    case ECellType.Wall:
      return "wall"
    default:
      return ""
  }
}

export function getOnTargetClass({ onTarget }: { onTarget?: boolean }) {
  return onTarget ? " onTarget" : ""
}

export function getCellStyle({ x, y }: IPosition) {
  return {
    transform: `translate(${100 * x}%, ${100 * y}%)`,
  } as StyleValue
}
