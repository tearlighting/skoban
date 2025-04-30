import type { ECellType } from "@/skoban/core/config"
import type { IViewerFactory } from "./IViewerFactory"
import type { Cell } from "@/skoban/core/oop/entities/Cell"
import { ReactPlayerViewer } from "../react/ReactPlayerViewer"
import { ReactCellViewer } from "../react/RectCellViewer"
import { ReactBoxViewer } from "../react/ReactBoxViewer"

export class ReactViewerFactory implements IViewerFactory {
  createPlayer<T extends ECellType.Player>(cellIns: Cell<T>, type: T) {
    return new ReactPlayerViewer(cellIns, type)
  }
  createFloor<T extends ECellType.Floor>(cellIns: Cell<T>, type: ECellType) {
    return new ReactCellViewer(cellIns, type)
  }
  createWall<T extends ECellType.Wall>(cellIns: Cell<T>, type: ECellType) {
    return new ReactCellViewer(cellIns, type)
  }
  createTarget<T extends ECellType.Target>(cellIns: Cell<T>, type: ECellType) {
    return new ReactCellViewer(cellIns, type)
  }
  createBox<T extends ECellType.Box>(cellIns: Cell<T>, type: T) {
    return new ReactBoxViewer(cellIns, type)
  }
}
