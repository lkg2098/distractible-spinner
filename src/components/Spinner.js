import { useState } from "react";
import { keyframes, styled } from "styled-components";
import { Wedges } from "./Wedges";

export function Spinner({ wedges, spin, handleResults }) {
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(0);
  const [endAngle, setEndAngle] = useState(0);
  const [target, setTarget] = useState("");

  const spinAnim = keyframes`from{
        transform: rotate(${angle}deg);
    }
    to{
        transform: rotate(${endAngle}deg);
    }`;

  const SpinnerContainer =
    spinning === 1
      ? styled.div`
          animation: 5s ${spinAnim} ease-out;
          animation-fill-mode: forwards;
        `
      : styled.div``;

  const spinWheel = () => {
    const targetWedge = spin();
    if (targetWedge) {
      setTarget(targetWedge.label || "[Blank]");
      let targetAngle =
        1081 +
        targetWedge.startAngle +
        Math.ceil(Math.random() * (targetWedge.size - 1));
      setEndAngle(-1 * targetAngle);
      setSpinning(1);
    }
  };
  const endAnimation = () => {
    setAngle(endAngle % 360);
    setSpinning(0);
    handleResults(target);
  };

  return (
    <div className="spinnerContainer">
      <div className="pointer"></div>
      <SpinnerContainer
        className="spinner"
        onAnimationEnd={endAnimation}
        style={{
          transform: `rotate(${angle}deg)`,
        }}
      >
        <Wedges wedges={wedges} />
      </SpinnerContainer>
      <button
        className="spinButton"
        onClick={spinWheel}
        disabled={spinning === 1}
      >
        SPIN!
      </button>
    </div>
  );
}
