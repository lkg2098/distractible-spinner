import { useMemo, useState, useEffect } from "react";

export function Wedge({ wedgeData }) {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);
  const getClipPath = () => {
    let r = 275;
    let line = 525;
    let font = 8;

    if (screenSize.width < 450) {
      r = 175;
      line = 329;
      font = 5;
    } else if (screenSize.width < 900) {
      r = 200;
      line = 376;
      font = 6;
    } else if (screenSize.width < 1200) {
      r = 250;
      line = 470;
    }
    const angle = wedgeData.size * 3.6;

    let x = r + -1 * r * Math.cos((Math.PI * wedgeData.size) / 180);
    let y = r + -1 * r * Math.sin((Math.PI * wedgeData.size) / 180);

    const angleSize = angle > 180 ? 1 : 0;

    const pathString =
      '"M 0 ' +
      r +
      "A " +
      r +
      " " +
      r +
      " 90 " +
      angleSize +
      " 1 " +
      x +
      " " +
      y +
      " L " +
      r +
      " " +
      r +
      ' Z"';
    return {
      lineHeight: "calc(" + line + "px + " + 360 / wedgeData.size + "%)",
      fontSize: font,
      path: pathString,
    };
  };

  const wedgeStyles = useMemo(getClipPath, [wedgeData.size, screenSize]);

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: wedgeData.color,
        clipPath: "path(" + wedgeStyles.path + ")",

        transform: "rotate(" + wedgeData.startAngle + "deg)",
      }}
      className="innerSpinner"
    >
      <div
        style={{
          fontSize: wedgeStyles.fontSize + Math.sqrt(wedgeData.size) + "px",
          lineHeight: wedgeStyles.lineHeight,
          transform: "rotate(" + Math.round(50 * wedgeData.size) / 100 + "deg)",
        }}
        className="wedgeText"
      >
        <p>{wedgeData.label}</p>
      </div>
    </div>
  );
}
