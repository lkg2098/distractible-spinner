import { useEffect, useMemo, useState } from "react";
import { FaLock, FaUnlock } from "react-icons/fa";
export function ProbabilitiesList({
  options,
  probabilities,
  handleProbabilities,
  setToStandard,
}) {
  const remainder = useMemo(() => {}, [probabilities]);

  const handleChange = (e) => {
    let key = e.target.name;
    let value = parseInt(e.target.value) || 0;

    let probs = { ...probabilities };

    if (value && value != 0) {
      probs[key] = value;
    } else if (probs[key]) {
      delete probs[key];
    }

    handleProbabilities(probs);
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
            {key != "" ? '"' + key + '"' : "[Blank]"}{" "}
          </p>
          <p>:</p>
        </div>
        <div className="probabilityField">
          <label>
            <input
              type="number"
              name={key}
              value={removeLeadingZero(probabilities[key])}
              min={0}
              max={100}
              onChange={(e) => handleChange(e)}
            />
            <p>%</p>
            <button className="iconButton" id="unlocked">
              <FaUnlock
                style={{ margin: "auto", marginRight: "0px" }}
                className="buttonIcon"
              />
            </button>
          </label>
          <p style={{ display: "inline" }} className="wheelProb">
            {options[key].probability}%
          </p>
        </div>
      </div>
    );
  });
  return (
    <div className="fieldEditor" id="back">
      <form>{probabilitiesMarkup}</form>
      <div>
        <button className="menuButton" onClick={setToStandard}>
          Set to Standard Weights
        </button>
      </div>
    </div>
  );
}
