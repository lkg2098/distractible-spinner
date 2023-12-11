import { useEffect, useMemo } from "react";

export function ProbabilitiesList({
  options,
  probabilities,
  calculateProbability,
  handleProbabilities,
  weights,
  changeWeight,
  setToStandard,
  zeroAll,
}) {
  const total = useMemo(() => {
    let sum = 0;
    for (let key in weights) {
      sum += weights[key];
    }
    return sum;
  }, [weights]);

  useEffect(() => {
    let newProbs = {};
    for (let key in weights) {
      if (weights[key] !== 0) {
        newProbs[key] = Math.round((100 * weights[key]) / total);
      }
    }
    handleProbabilities(newProbs);
  }, [weights, total, handleProbabilities]);

  const handleChange = (e) => {
    let key = e.target.name;
    let value = parseInt(e.target.value) || 0;

    changeWeight(key, value);
  };

  const handleFocusOut = (e) => {
    let value = e.target.value;
    let key = e.target.name;

    if (value > 100) {
      changeWeight(key, 100);
    } else if (value < 0) {
      changeWeight(key, 0);
    }
  };

  const removeLeadingZero = (value) => {
    if (!value) {
      return 0;
    } else {
      return Number(value).toString();
    }
  };

  const probabilitiesMarkup = Object.keys(options).map((key) => {
    return (
      <div className="wedgeField">
        <div className="probLabel">
          <p style={{ width: "9em", overflowWrap: "break-word" }}>
            {key !== "" ? '"' + key + '"' : "[Empty]"}{" "}
          </p>
        </div>
        <div className="probabilityField">
          <label>
            <input
              type="number"
              name={key}
              value={removeLeadingZero(weights[key])}
              min={0}
              max={100}
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleFocusOut(e)}
            />
          </label>
          <p>{probabilities[key] || 0}%</p>
          <p style={{ display: "inline" }} className="wheelProb">
            {calculateProbability(options[key])}%
          </p>
        </div>
      </div>
    );
  });
  return (
    <div className="fieldEditor" id="back">
      <menu id="probabilityHeader">
        <p>Weights</p>
        <p>Rigged %</p>
        <p>Wheel %</p>
      </menu>
      <form className="resultBoxContainer">{probabilitiesMarkup}</form>
      <div className="menuButtons">
        <button className="menuButton" onClick={setToStandard}>
          Reset
        </button>
        <button className="menuButton" onClick={zeroAll}>
          Zero All
        </button>
      </div>
    </div>
  );
}
