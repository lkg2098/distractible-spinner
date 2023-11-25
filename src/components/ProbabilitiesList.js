import { useEffect, useMemo, useState } from "react";

export function ProbabilitiesList({
  options,
  probabilities,
  handleProbabilities,
}) {
  const setToStandard = (e) => {
    e.preventDefault();
    let probs = {};
    for (let key of Object.keys(options)) {
      probs[key] = options[key].probability;
    }
    handleProbabilities(probs);
  };

  const handleChange = (e) => {
    let probs = { ...probabilities };
    if (e.target.value != 0) {
      probs[e.target.name] = parseInt(e.target.value);
    } else if (probs[e.target.name]) {
      delete probs[e.target.name];
    }
    handleProbabilities(probs);
  };

  const probabilitiesMarkup = Object.keys(options).map((key) => {
    return (
      <div className="wedgeField">
        <p
          style={{
            width: "100px",
          }}
        >
          {key != "" ? key : "[Blank]"}:{" "}
        </p>
        <label>
          <input
            className="probField"
            type="number"
            name={key}
            value={probabilities[key] || 0}
            min={0}
            max={100}
            onChange={(e) => handleChange(e)}
          />
          <p>%</p>
        </label>
        <p className="wheelProb">{options[key].probability}%</p>
      </div>
    );
  });
  return (
    <div className="fieldEditor">
      <form>
        {probabilitiesMarkup}
        <button onClick={setToStandard}>Set to Standard Weights</button>
      </form>
    </div>
  );
}
