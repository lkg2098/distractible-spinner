import { useEffect, useMemo, useState } from "react";

export function ProbabilitiesList({
  options,
  probabilities,
  calculateProbability,
  handleProbabilities,
  setToStandard,
  flipped,
}) {
  const [fields, setFields] = useState(
    JSON.parse(window.localStorage.getItem("weights")) || {}
  );

  useEffect(() => {
    if (flipped === 1 && !JSON.parse(window.localStorage.getItem("weights"))) {
      let newFields = {};
      for (let key in options) {
        newFields[key] = options[key].length;
      }
      setFields(newFields);
    }
  }, [flipped, options]);

  const total = useMemo(() => {
    let sum = 0;
    for (let key in fields) {
      sum += fields[key];
    }
    return sum;
  }, [fields]);

  useEffect(() => {
    window.localStorage.setItem("weights", JSON.stringify(fields));
    let newProbs = {};
    for (let key in fields) {
      if (fields[key] !== 0) {
        newProbs[key] = Math.round((100 * fields[key]) / total);
      }
    }
    handleProbabilities(newProbs);
  }, [fields, total, handleProbabilities]);

  const handleChange = (e) => {
    let key = e.target.name;
    let value = parseInt(e.target.value) || 0;

    let fieldsCopy = { ...fields };

    if (value && value !== 0) {
      fieldsCopy[key] = value;
    } else if (fieldsCopy[key]) {
      delete fieldsCopy[key];
    }

    setFields(fieldsCopy);
  };

  const handleFocusOut = (e) => {
    let value = e.target.value;
    let key = e.target.name;

    let fieldsCopy = { ...fields };

    if (value > 100) {
      fieldsCopy[key] = 100;
      setFields(fieldsCopy);
    } else if (value < 0) {
      delete fieldsCopy[key];
      setFields(fieldsCopy);
    }
  };

  const setToZero = () => {
    setFields({});
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
              value={removeLeadingZero(fields[key])}
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
        <button className="menuButton" onClick={setToZero}>
          Zero All
        </button>
      </div>
    </div>
  );
}
