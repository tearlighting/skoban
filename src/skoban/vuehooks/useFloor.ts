import { ECellType } from "../core/config"
import { useCell } from "./useCell"

interface IUseFloorParams {
  position: IPosition
}
export function useFloor({ position }: IUseFloorParams) {
  const { cell: floor } = useCell({ position, cellType: ECellType.Floor })
  return {
    floor,
  }
}
