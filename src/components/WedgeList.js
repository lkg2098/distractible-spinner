import { FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons";
import { ProbabilitiesList } from "./ProbabilitiesList";

export function WedgeList({
  wedges,
  addWedge,
  handleChange,
  handleProbabilities,
}) {
  const fields = wedges.map((wedge, index) => {
    return (
      <div className="wedgeField">
        <input
          type={"text"}
          value={wedge.label}
          name={"label"}
          onChange={(e) => handleChange(e, index)}
        />
        <input
          type={"color"}
          value={wedge.color}
          name={"color"}
          onChange={(e) => handleChange(e, index)}
        />
        <button className="xButton">
          <FaTimes className="buttonIcon" />
        </button>
      </div>
    );
  });
  return (
    <div className="fieldEditor">
      <form>{fields}</form>
      <div style={{ width: "150px", alignItems: "center" }}>
        <button onClick={addWedge}>Add Wedge</button>
        <button onClick={handleProbabilities}>Probabilities</button>
      </div>
    </div>
  );
}
