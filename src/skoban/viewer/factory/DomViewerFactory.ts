import type { ECellType } from "@/skoban/core/config"
import type { Cell } from "@/skoban/core/oop/entities/Cell"
import type { IViewerFactory } from "./IViewerFactory"
import { DomBoxViewer } from "../dom/DomBoxViewer"
import { DomPlayerViewer } from "../dom/DomPlayerViewer"
import { DomCellViewer } from "../dom/DomCellViewer"

export class DomViewerFactory implements IViewerFactory {
  constructor(private readonly _parent: HTMLElement) {}
  createPlayer<T extends ECellType.Player>(cellIns: Cell<T>, type: T): DomPlayerViewer {
    return new DomPlayerViewer(cellIns, type, this._parent)
  }
  createFloor<T extends ECellType.Floor>(cellIns: Cell<T>, type: ECellType): ICellViewer<T> {
    return new DomCellViewer(cellIns, type, this._parent)
  }
  createWall<T extends ECellType.Wall>(cellIns: Cell<T>, type: ECellType): ICellViewer<T> {
    return new DomCellViewer(cellIns, type, this._parent)
  }
  createTarget<T extends ECellType.Target>(cellIns: Cell<T>, type: ECellType): ICellViewer<T> {
    return new DomCellViewer(cellIns, type, this._parent)
  }
  createBox<T extends ECellType.Box>(cellIns: Cell<T>, type: T): DomBoxViewer {
    return new DomBoxViewer(cellIns, type, this._parent)
  }
}
