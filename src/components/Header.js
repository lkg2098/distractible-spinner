import { IconContext } from "react-icons";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RxColorWheel } from "react-icons/rx";
export function Header({ flip, handleTutorial }) {
  return (
    <div className="header" shift={flip !== 1 ? 0 : 1}>
      <div className="title">
        <IconContext.Provider value={{ size: "2.7em", color: "plum" }}>
          <RxColorWheel
            style={{ transform: "rotate(22.5deg)", paddingInline: "10px" }}
          />
        </IconContext.Provider>

        <h1>The Wheel of </h1>
        <div className="shiftBox">
          <h1 className="shiftDown" id="top">
            Unf
          </h1>
          <h1 className="shiftDown">F</h1>
        </div>
        <h1 className="shiftLeft">airness</h1>
      </div>

      <button
        className="iconButton"
        id="showTutorial"
        onClick={() => handleTutorial(1)}
      >
        <IconContext.Provider value={{ size: "2.2em", color: "plum" }}>
          <FaRegQuestionCircle />
        </IconContext.Provider>
      </button>
      <div className="dialogBox">Show Tutorial</div>
    </div>
  );
}
