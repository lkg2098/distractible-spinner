import { IconContext } from "react-icons";
import { FaTimes, FaUserSecret } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

export function Tutorial({ active, handleActive }) {
  const tutorialText = [
    "Click here to rig the odds!",
    "Great job! Happy pranking!",
  ];
  const bubbleMarkup =
    active > 0 && active < 3 ? (
      <div className="bubble">
        <div className="bubbleHeader">
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconContext.Provider value={{ size: "1.5em" }}>
              <FaUserSecret />
            </IconContext.Provider>
            <h3 style={{ paddingLeft: "0.5em" }}>Psssst!</h3>
          </div>
          <button
            className="iconButton"
            id="xOut"
            onClick={() => handleActive(3)}
          >
            <FaTimes />
          </button>
        </div>
        <p style={{ height: "2em" }}>{tutorialText[active - 1]}</p>
        {active < 2 && (
          <div className="iconButton" id="animatedArrow">
            <IconContext.Provider value={{ size: "1.5em" }}>
              <FaArrowLeftLong />
            </IconContext.Provider>
          </div>
        )}
      </div>
    ) : (
      <></>
    );
  return <>{bubbleMarkup} </>;
}
