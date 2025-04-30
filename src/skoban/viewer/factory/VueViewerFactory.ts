import type { ECellType } from "@/skoban/core/config"
import { VuePlayerViewer } from "../vue/VuePlayerViewer"
import type { IViewerFactory } from "./IViewerFactory"
import type { Cell } from "@/skoban/core/oop/entities/Cell"
import { VueCellViewer } from "../vue/VueCellViewer"
import { VueBoxViewer } from "../vue/VueBoxViewer"
import { reactive } from "vue"

export class VueViewerFactory implements IViewerFactory {
  createPlayer<T extends ECellType.Player>(cellIns: Cell<T>, type: T) {
    return reactive(new VuePlayerViewer(cellIns, type))
  }
  createFloor<T extends ECellType.Floor>(cellIns: Cell<T>, type: ECellType) {
    return reactive(new VueCellViewer(cellIns, type))
  }
  createWall<T extends ECellType.Wall>(cellIns: Cell<T>, type: ECellType) {
    return reactive(new VueCellViewer(cellIns, type))
  }
  createTarget<T extends ECellType.Target>(cellIns: Cell<T>, type: ECellType) {
    return reactive(new VueCellViewer(cellIns, type))
  }
  createBox<T extends ECellType.Box>(cellIns: Cell<T>, type: T) {
    return reactive(new VueBoxViewer(cellIns, type))
  }
}
