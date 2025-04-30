import { useSkoban } from "./useSkoban"
import ReactDOM from "react-dom/client"

function Skoban() {
  const { renderData, reset, next, win, hasNextLevel } = useSkoban()
  return (
    <>
      <div className="app-container">
        <button className="reset" onClick={reset}>
          reset
        </button>
        <div className="game-container">
          <div className="mapContainer">
            {/* <div v-for="(cell, rowIndex) in cells" :key="rowIndex" class="cellBlock" :class="cell.class"
					:style="cell.style">
				</div> */}
            {renderData.map((item, index) => {
              return <div className={item.class + " cellBlock"} style={item.style as any} key={index}></div>
            })}
          </div>

          <label className="text">{win ? "clear" : "playing"}</label>
          {win && hasNextLevel() ? (
            <button className="next" onClick={next}>
              next
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  )
}

export function mountReactComponent(container: HTMLElement) {
  const root = ReactDOM.createRoot(container)
  root.render(<Skoban />)
  return () => root.unmount()
}
