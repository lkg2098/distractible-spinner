import { useMemo } from "react";

export function Wedge({ wedgeData }) {
  const getClipPath = () => {
    const cX = 325;
    const cY = 325;
    const r = 325;

    const angle = wedgeData.size * 3.6;

    let x = cX + -1 * r * Math.cos((Math.PI * wedgeData.size) / 180);
    let y = cY + -1 * r * Math.sin((Math.PI * wedgeData.size) / 180);

    const angleSize = angle > 180 ? 1 : 0;

    const pathString =
      '"M 0 ' +
      r +
      "A " +
      cX +
      " " +
      cY +
      " 90 " +
      angleSize +
      " 1 " +
      x +
      " " +
      y +
      " L " +
      cX +
      " " +
      cY +
      ' Z"';
    //alert(360 / wedgeData.size);
    return pathString;
  };

  const pathString = useMemo(getClipPath, [wedgeData.size]);
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: wedgeData.color,
        "clip-path": "path(" + pathString + ")",

        transform: "rotate(" + wedgeData.startAngle + "deg)",
      }}
      className="innerSpinner"
    >
      <div
        style={{
          fontSize: 8 + Math.pow(wedgeData.size, 1 / 2) + "px",
          lineHeight: "calc(620px + " + 360 / wedgeData.size + "%)",
          transform: "rotate(" + Math.round(50 * wedgeData.size) / 100 + "deg)",
        }}
        className="wedgeText"
      >
        <p>{wedgeData.label}</p>
      </div>
    </div>
  );
}
