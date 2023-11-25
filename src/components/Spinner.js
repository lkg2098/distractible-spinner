import { useState } from "react";
import { keyframes, styled } from "styled-components";
import { SpinSetter } from "./SpinSetter";
import { Wedge } from "./Wedge";
import { Wedges } from "./Wedges";

export function Spinner({ wedges, spin }) {
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(0);
  const [endAngle, setEndAngle] = useState(0);
  const [targWedge, setTargWedge] = useState({});

  const spinAnim = keyframes`from{
        transform: rotate(${angle}deg);
    }
    to{
        transform: rotate(${endAngle}deg);
    }`;

  const FadeInButton =
    spinning === 1
      ? styled.div`
          animation: 5s ${spinAnim} ease-out;
          animation-fill-mode: forwards;
        `
      : styled.div``;

  const spinWheel = (targetAngle) => {
    setEndAngle(targetAngle);
    setSpinning(1);
  };

  const spinWheel2 = () => {
    const targetWedge = spin();
    setTargWedge(targetWedge);
    if (targetWedge) {
      let targetAngle =
        1082 +
        targetWedge.startAngle +
        Math.ceil(Math.random() * (targetWedge.size - 3));
      setEndAngle(-1 * targetAngle);
      setSpinning(1);
    }
  };
  const endAnimation = () => {
    setAngle(endAngle % 360);
    setSpinning(0);
  };

  const backToCenter = () => {
    setEndAngle(0);
    setSpinning(1);
  };

  const testWedge =
    wedges.length > 0 ? (
      <Wedge
        color={wedges[0].color}
        size={wedges[0].size}
        startAngle={wedges[0].startAngle}
      />
    ) : (
      <></>
    );
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        padding: "15px",
      }}
    >
      <div className="pointer"></div>
      <FadeInButton
        className="spinner"
        onAnimationEnd={endAnimation}
        style={{
          transform: `rotate(${angle}deg)`,
        }}
      >
        <Wedges wedges={wedges} />
      </FadeInButton>
      <button
        style={{ zIndex: "1" }}
        onClick={spinWheel2}
        disabled={spinning == 1}
      >
        TRY IT
      </button>
      <button onClick={backToCenter}>Recenter</button>
      {/* <SpinSetter spinWheel={spinWheel} /> */}
    </div>
  );
}
