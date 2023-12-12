import { useState } from "react";
import { IconContext } from "react-icons";
import { FaTimes } from "react-icons/fa";
import { Wedges } from "./Wedges";
import trophy from "../media/trophy.png";
import Confetti from "react-confetti";

export function Spinner({ wedges, spin, handleResults, angle, handleAngle }) {
  const [spinning, setSpinning] = useState(0);
  const [target, setTarget] = useState("");
  const [modalOpen, setModalOpen] = useState(0);

  const spinWheel = () => {
    const targetWedge = spin();
    if (targetWedge) {
      setTarget(targetWedge.label || "[Empty]");
      let targetAngle =
        1081 +
        targetWedge.startAngle +
        Math.ceil(Math.random() * (targetWedge.size - 1));
      handleAngle(-1 * targetAngle);
      setSpinning(1);
    }
  };
  const endTransition = () => {
    handleAngle(angle % 360);
    setSpinning(0);
    handleResults(target);
    setModalOpen(1);
  };

  return (
    <section className="spinnerSection">
      <div className="modal" check={modalOpen.toString()}>
        <button className="iconButton" onClick={() => setModalOpen(0)}>
          <IconContext.Provider value={{ size: "1.3em" }}>
            <FaTimes />
          </IconContext.Provider>
        </button>
        <img src={trophy} alt="Trophy" />
        <p>And the winner is...</p>
        <h1>{target}!</h1>
      </div>
      <Confetti className="confetti" />
      <div className="spinnerContainer">
        <div
          className="spinner"
          onTransitionEnd={endTransition}
          spinning={spinning.toString()}
          style={{
            transform: `translate(-50%, -50%) rotate(${angle}deg)`,
          }}
        >
          <Wedges wedges={wedges} />
        </div>
        <div className="shadow" />
        <div className="buttonWrapper">
          <button
            className="spinButton"
            onClick={spinWheel}
            disabled={spinning === 1}
          >
            <p>SPIN!</p>
          </button>
        </div>
      </div>
    </section>
  );
}
