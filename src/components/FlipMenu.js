import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaStop } from "react-icons/fa";
import { ProbabilitiesList } from "./ProbabilitiesList";
import { Tutorial } from "./Tutorial";
import { WedgeList } from "./WedgeList";

export function FlipMenu({
  wedges,
  addWedge,
  handleChange,
  calcProbabilities,
  options,
  probabilities,
  handleProbabilities,
  results,
  handleResults,
}) {
  const [flip, setFlip] = useState(0);
  const [tutorial, setTutorial] = useState(false);

  const toggleFlip = () => {
    if (flip == 2) {
      setFlip(1);
    } else {
      setFlip(flip + 1);
    }
  };

  const setToStandard = () => {
    let probs = {};
    for (let key of Object.keys(options)) {
      if (options[key].probability) {
        probs[key] = options[key].probability;
      }
    }
    handleProbabilities(probs);
  };

  const flipMenu = () => {
    if (flip != 1) {
      calcProbabilities();
      if (flip == 0) {
        setToStandard();
      }
    }
    handleTutorial();
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
            handleChange={handleChange}
            results={results}
            handleTutorial={handleTutorial}
            handleResults={handleResults}
          />

          <ProbabilitiesList
            options={options}
            probabilities={probabilities}
            handleProbabilities={handleProbabilities}
            setToStandard={setToStandard}
          />
          <button
            id={tutorial === 1 ? "clickHere" : null}
            className="secret"
            onClick={flipMenu}
          ></button>
        </div>
      </div>
      <Tutorial active={tutorial} handleActive={handleTutorial} />
    </div>
  );
}
