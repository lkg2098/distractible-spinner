import { useEffect, useState } from "react";
import { ProbabilitiesList } from "./ProbabilitiesList";
import { Tutorial } from "./Tutorial";
import { WedgeList } from "./WedgeList";

export function FlipMenu({
  wedges,
  addWedge,
  handleDelete,
  handleChange,
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

  useEffect(() => {
    window.localStorage.setItem("flip", flip);
  }, [flip]);

  useEffect(() => {
    window.localStorage.setItem("tutorial", tutorial);
  }, [tutorial]);

  const toggleFlip = () => {
    if (flip === 2) {
      setFlip(1);
    } else {
      setFlip(flip + 1);
    }
  };
  const setToStandard = () => {
    let probs = {};
    for (let key of Object.keys(options)) {
      if (options[key]) {
        probs[key] = Math.round((100 * options[key].length) / wedges.length);
      }
    }
    handleProbabilities(probs);
  };

  const flipMenu = () => {
    if (flip !== 1 && tutorial === 0) {
      handleTutorial(4);
    } else {
      if (flip === 0) {
        setToStandard();
      }

      handleTutorial();
    }
    toggleFlip();
  };

  const handleTutorial = (close) => {
    if (tutorial < 3) setTutorial(tutorial + 1);
    if (close) setTutorial(close);
  };

  return (
    <div>
      <div className="sidebar">
        <div className="flipCard" flip={flip}>
          <WedgeList
            wedges={wedges}
            addWedge={addWedge}
            handleDelete={handleDelete}
            handleChange={handleChange}
            results={results}
            handleTutorial={handleTutorial}
            handleResults={handleResults}
          />
          <ProbabilitiesList
            options={options}
            calculateProbability={getProbability}
            probabilities={probabilities}
            handleProbabilities={handleProbabilities}
            setToStandard={setToStandard}
            flipped={flip}
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
