import { useEffect, useState } from "react";
import { Wedge } from "./Wedge";

export function Wedges({ wedges }) {
  const wedgesMarkup =
    wedges.length != 1 ? (
      wedges.map((wedge) => {
        return <Wedge wedgeData={wedge} />;
      })
    ) : (
      <div
        style={{
          backgroundColor: wedges[0].color,
          borderRadius: "50%",
          height: "500px",
          width: "500px",
          transform: "rotate(-90deg)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            lineHeight: "500px",
            margin: "auto",
            color: "white",
          }}
        >
          {wedges[0].label}
        </p>
      </div>
    );

  return <div className="wedges">{wedgesMarkup}</div>;
}
