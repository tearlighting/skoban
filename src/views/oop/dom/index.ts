import { Skoban } from "@/skoban"
import { DomGameViewer } from "@/skoban/viewer/dom/DomGameViewer"
import { DomViewerFactory } from "@/skoban/viewer/factory/DomViewerFactory"
import { useGameLevel } from "@/hooks/useGameLevel"
import type { generateMap } from "@/utils"

function useTextControl() {
  const text = document.querySelector(".text") as HTMLElement

  function setWin() {
    text.innerText = "win"
  }

  function setPlaying() {
    text.innerText = "playing"
  }
  setPlaying()
  return {
    setWin,
    setPlaying,
  }
}

function useResetBtnControl(handler: () => void) {
  const restBtn = document.querySelector(".reset") as HTMLButtonElement
  restBtn.addEventListener("click", handler)
  function remove() {
    restBtn.removeEventListener("click", handler)
  }
  return {
    remove,
  }
}

function useNextBtnControl(handler: () => void) {
  const nextBtn = document.querySelector(".next") as HTMLButtonElement
  nextBtn.addEventListener("click", newHanlder)
  function newHanlder() {
    handler()
    hiddenNextBtn()
  }
  function remove() {
    nextBtn.removeEventListener("click", newHanlder)
  }

  function hiddenNextBtn() {
    nextBtn.style.display = "none"
  }
  function showNextBtn() {
    nextBtn.style.display = "block"
  }
  hiddenNextBtn()
  return {
    remove,
    hiddenNextBtn,
    showNextBtn,
  }
}

function init(paylaod: { initGame: (payload: ReturnType<typeof generateMap>) => void }) {
  const { hasNextLevel, getCurrentMap, nextLevel } = useGameLevel()
  const { setWin, setPlaying } = useTextControl()

  function onClickNextBtn() {
    setPlaying()
    nextLevel()
    paylaod.initGame(getCurrentMap())
  }
  const { hiddenNextBtn, showNextBtn, remove: removeNextBtnControl } = useNextBtnControl(onClickNextBtn)
  function onClickRestBtn() {
    setPlaying()
    paylaod.initGame(getCurrentMap())
    hiddenNextBtn()
  }
  const { remove: removeResetBtnControl } = useResetBtnControl(onClickRestBtn)

  function onWin() {
    setWin()
    hasNextLevel() && showNextBtn()
  }
  return {
    onWin,
    removeNextBtnControl,
    removeResetBtnControl,
    getCurrentMap,
  }
}

export function useSkobanDom() {
  const initGameObj = {
    initGame: null as (payload: ReturnType<typeof generateMap>) => void,
  }
  const map = document.querySelector(".mapContainer") as HTMLDivElement

  const { removeNextBtnControl, removeResetBtnControl, onWin, getCurrentMap } = init(initGameObj)

  const domViewerFactoryIns = new DomViewerFactory(map)
  const domGameViewerIns = new DomGameViewer(onWin)
  const skobanIns = new Skoban(domGameViewerIns, domViewerFactoryIns)
  initGameObj.initGame = (paylaod: ReturnType<typeof generateMap>) => {
    skobanIns.init(paylaod)
  }
  skobanIns.init(getCurrentMap())
  window.onbeforeunload = () => {
    removeNextBtnControl()
    removeResetBtnControl()
  }
}
