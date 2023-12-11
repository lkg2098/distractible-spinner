import { Wedge } from "./Wedge";

export function Wedges({ wedges }) {
  const wedgesMarkup =
    wedges.length !== 1 ? (
      wedges.map((wedge) => {
        return <Wedge wedgeData={wedge} />;
      })
    ) : (
      <div
        style={{
          backgroundColor: wedges[0].color,
          borderRadius: "50%",
          height: "600px",
          width: "600px",
          transform: "rotate(-90deg)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            lineHeight: "650px",
            margin: "auto",
            color: "white",
            fontSize: 8 + Math.sqrt(360),
          }}
        >
          {wedges[0].label}
        </p>
      </div>
    );

  return <div className="wedges">{wedgesMarkup}</div>;
}
