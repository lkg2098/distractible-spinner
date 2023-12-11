import { useEffect, useState } from "react";
import { Header } from "./Header";
import { ProbabilitiesList } from "./ProbabilitiesList";
import { Tutorial } from "./Tutorial";
import { WedgeList } from "./WedgeList";

export function FlipMenu({
  wedges,
  addWedge,
  handleDelete,
  handleChange,
  clearWedges,
  getProbability,
  options,
  probabilities,
  handleProbabilities,
  results,
  handleResults,
}) {
  const [flip, setFlip] = useState(
    JSON.parse(window.localStorage.getItem("flip")) || 0
  );
  const [tutorial, setTutorial] = useState(
    JSON.parse(window.localStorage.getItem("tutorial")) || 0
  );

  const [weights, setWeights] = useState(
    JSON.parse(window.localStorage.getItem("weights")) || {}
  );

  useEffect(() => {
    window.localStorage.setItem("flip", flip);
  }, [flip]);

  useEffect(() => {
    window.localStorage.setItem("tutorial", tutorial);
  }, [tutorial]);

  useEffect(() => {
    window.localStorage.setItem("weights", JSON.stringify(weights));
  });

  const toggleFlip = () => {
    if (flip === 2) {
      setFlip(1);
    } else {
      setFlip(flip + 1);
    }
  };

  const setToStandard = () => {
    let newWeights = {};
    for (let key of Object.keys(options)) {
      newWeights[key] = options[key].length;
    }
    setWeights(newWeights);
  };

  const zeroAll = () => {
    setWeights({});
  };

  const flipMenu = () => {
    if (flip !== 1 && tutorial === 0) {
      handleTutorial(3);
    } else {
      if (flip === 0) {
        setToStandard();
      }

      handleTutorial();
    }
    toggleFlip();
  };

  const handleTutorial = (value) => {
    if (tutorial < 3) setTutorial(tutorial + 1);
    if (value) setTutorial(value);
  };

  const handleWeightChange = (key, value) => {
    const weightsCopy = { ...weights };
    if (value === 0) {
      delete weightsCopy[key];
    } else {
      weightsCopy[key] = value;
    }

    setWeights(weightsCopy);
  };

  const clear = () => {
    clearWedges();
    setFlip(0);
  };

  return (
    <div>
      <Header flip={flip} handleTutorial={handleTutorial} />
      <div className="sidebar">
        <div className="flipCard" flip={flip}>
          <WedgeList
            wedges={wedges}
            addWedge={addWedge}
            handleDelete={handleDelete}
            handleChange={handleChange}
            clearWedges={clear}
            results={results}
            handleTutorial={handleTutorial}
            handleResults={handleResults}
          />
          <ProbabilitiesList
            options={options}
            calculateProbability={getProbability}
            probabilities={probabilities}
            handleProbabilities={handleProbabilities}
            changeWeight={handleWeightChange}
            weights={weights}
            setToStandard={setToStandard}
            zeroAll={zeroAll}
          />

          <button
            id={tutorial === 1 ? "clickHere" : null}
            className="secret"
            onClick={flipMenu}
          >
            Click Here to Return
          </button>
        </div>
      </div>
      <Tutorial active={tutorial} handleActive={handleTutorial} />
    </div>
  );
}
