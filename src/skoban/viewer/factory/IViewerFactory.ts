import type { ECellType } from "@/skoban/core/config"
import type { Cell } from "@/skoban/core/oop/entities/Cell"

export interface IViewerFactory {
  createBox<T extends ECellType.Box>(cellIns: Cell<T>, type: ECellType): ICellViewer<T>
  createPlayer<T extends ECellType.Player>(cellIns: Cell<T>, type: ECellType): ICellViewer<T>
  createFloor<T extends ECellType.Floor>(cellIns: Cell<T>, type: ECellType): ICellViewer<T>
  createWall<T extends ECellType.Wall>(cellIns: Cell<T>, type: ECellType): ICellViewer<T>
  createTarget<T extends ECellType.Target>(cellIns: Cell<T>, type: ECellType): ICellViewer<T>
}
