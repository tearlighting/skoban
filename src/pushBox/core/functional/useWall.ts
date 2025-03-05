import { ECellType } from "../config"
import { useCell } from "./useCell"

interface IUseWallParams {
  position: IPosition
}

export function useWall({ position }: IUseWallParams) {
  const { cell: wall } = useCell({ position, cellType: ECellType.Wall })
  return {
    wall,
  }
}
