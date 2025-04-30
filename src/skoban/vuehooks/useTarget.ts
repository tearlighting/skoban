import { ECellType } from "../core/config"
import { useCell } from "./useCell"

interface IUseTargetParams {
  position: IPosition
}
export function useTarget({ position }: IUseTargetParams) {
  const { cell: target } = useCell({ position, cellType: ECellType.Target })
  return {
    target,
  }
}
