import { useMemo } from "react";

export function Wedge({ wedgeData }) {
  const getClipPath = () => {
    const cX = 250;
    const cY = 250;
    const r = 250;

    const angle = wedgeData.size * 3.6;

    let x = cX + -1 * r * Math.cos((Math.PI * wedgeData.size) / 180);
    let y = cY + -1 * r * Math.sin((Math.PI * wedgeData.size) / 180);

    const angleSize = angle > 180 ? 1 : 0;

    const pathString =
      '"M 0 250 A 250 250 90 ' +
      angleSize +
      " 1 " +
      x +
      " " +
      y +
      ' L 250 250 Z"';

    return pathString;
  };

  const pathString = useMemo(getClipPath, [wedgeData.size]);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          backgroundColor: wedgeData.color,
          "clip-path": "path(" + pathString + ")",
          transform: "rotate(" + wedgeData.startAngle + "deg)",
        }}
        className="testCircle"
      >
        <div
          style={{
            transform:
              "rotate(" + Math.round(50 * wedgeData.size) / 100 + "deg)",
          }}
          className="wedgeText"
        >
          <p>{wedgeData.label}</p>
        </div>
      </div>
    </div>
  );
}
