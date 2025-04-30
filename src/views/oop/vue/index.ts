import { useGameLevel } from "@/hooks/useGameLevel"
import { Skoban } from "@/skoban"
import type { ECellType } from "@/skoban/core/config"
import { VueViewerFactory } from "@/skoban/viewer/factory/VueViewerFactory"
import type { VueCellViewer } from "@/skoban/viewer/vue/VueCellViewer"
import { VueGameViewer } from "@/skoban/viewer/vue/VueGameViewer"
import type { VuePlayerViewer } from "@/skoban/viewer/vue/VuePlayerViewer"
import { getCellStyle, getImgClass, getOnTargetClass } from "@/utils"
import { computed, reactive } from "vue"

export function useSkobanVue() {
  const { hasNextLevel, nextLevel, getCurrentMap } = useGameLevel()
  const vueCellViewerFactoryIns = new VueViewerFactory()
  const vueViewerIns = new VueGameViewer(() => setLatestSkobanStore())
  const skobanVueIns = new Skoban(vueViewerIns, vueCellViewerFactoryIns)

  const viewInfoStore = reactive({
    gameInfo: skobanVueIns.gameInfo,
  })
  reset()
  function reset() {
    skobanVueIns.init(getCurrentMap())
    setLatestSkobanStore()
  }
  function next() {
    if (hasNextLevel()) {
      nextLevel()
      reset()
    }
  }

  function setLatestSkobanStore() {
    viewInfoStore.gameInfo = skobanVueIns.gameInfo
  }

  const renderDataComputed = computed(() => {
    const viewInfoAlias = viewInfoStore.gameInfo
    const res = [
      viewInfoAlias.player ? getRenderData((viewInfoAlias.player as VuePlayerViewer).cellInfo) : null,
      ...(viewInfoAlias.boxes ? viewInfoAlias.boxes.map((box: VueCellViewer<any>) => getRenderData(box.cellInfo)) : []),
      ...(viewInfoAlias.floors ? viewInfoAlias.floors.map((floor: VueCellViewer<any>) => getRenderData(floor.cellInfo)) : []),
      ...(viewInfoAlias.walls ? viewInfoAlias.walls.map((wall: VueCellViewer<any>) => getRenderData(wall.cellInfo)) : []),
      ...(viewInfoAlias.targets ? viewInfoAlias.targets.map((target: VueCellViewer<any>) => getRenderData(target.cellInfo)) : []),
    ]
    return res.filter((x) => x)
  })

  const win = computed(() => viewInfoStore.gameInfo.win)
  return {
    reset,
    next,
    renderDataComputed,
    win,
    hasNextLevel,
  }
}

function getRenderData(paylaod: IPosition & { type: ECellType; onTarget?: boolean }) {
  const { onTarget = false, type } = paylaod
  return {
    class: getImgClass(type) + getOnTargetClass({ onTarget }),
    style: getCellStyle(paylaod),
  }
}
