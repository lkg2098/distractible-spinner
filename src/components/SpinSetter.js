import { useEffect, useState } from "react";

export function SpinSetter({ spinWheel }) {
  const calculateSpin = () => {
    const ind = Math.ceil(Math.random() * 6);

    const start = (360 / 6) * (ind - 1);
    const end = (360 / 6) * ind;
    const range = end - start;

    const randomAngle = 720 + start + Math.ceil(Math.random() * range);
    spinWheel(randomAngle);
  };
  return <button onClick={calculateSpin}>Spin!</button>;
}
