import { useState } from "react";
import { Wedges } from "./Wedges";
import { FaLocationPin, FaRotate } from "react-icons/fa6";
import { IconContext } from "react-icons";

export function Spinner({ wedges, spin, handleResults }) {
  const [spinning, setSpinning] = useState(0);
  const [endAngle, setEndAngle] = useState(0);
  const [target, setTarget] = useState("");

  const spinWheel = () => {
    const targetWedge = spin();
    if (targetWedge) {
      setTarget(targetWedge.label || "[Empty]");
      let targetAngle =
        1081 +
        targetWedge.startAngle +
        Math.ceil(Math.random() * (targetWedge.size - 1));
      setEndAngle(-1 * targetAngle);
      setSpinning(1);
    }
  };
  const endTransition = () => {
    setEndAngle(endAngle % 360);
    setSpinning(0);
    handleResults(target);
  };

  return (
    <section className="spinnerSection">
      <div className="spinnerContainer">
        <div
          className="spinner"
          onTransitionEnd={endTransition}
          spinning={spinning.toString()}
          style={{
            transform: `translate(-50%, -50%) rotate(${endAngle}deg)`,
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
