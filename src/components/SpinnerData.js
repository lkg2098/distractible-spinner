import { useState } from "react";
import { FlipMenu } from "./FlipMenu";
import { Spinner } from "./Spinner";

export function SpinnerData() {
  const [wedges, setWedges] = useState([]);
  const [options, setOptions] = useState({});
  const [probabilities, setProbabilities] = useState({});
  const [results, setResults] = useState([]);

  const generateColor = () => {
    let letters = "0123456789ABCDEF";

    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleWedgeData = (event, index) => {
    let key = event.target.name;
    let value = event.target.value;
    if (event.target.name === "label") {
      handleOptionData(event.target.value, index);
    }
    let wedgeCopy = [...wedges];
    wedgeCopy[index][key] = value;
    setWedges(wedgeCopy);
  };

  const handleOptionData = (newLabel, index) => {
    let optionsCopy = { ...options };
    let oldLabel = wedges[index].label;

    if (optionsCopy[oldLabel]) {
      let oldInstances = optionsCopy[oldLabel].instances;
      optionsCopy[oldLabel].instances = oldInstances.filter((i) => i !== index);
      if (optionsCopy[oldLabel].instances.length === 0) {
        delete optionsCopy[oldLabel];
        let probsCopy = { ...probabilities };
        delete probsCopy[oldLabel];
        setProbabilities(probsCopy);
      }
    }
    if (optionsCopy[newLabel]) {
      optionsCopy[newLabel].instances.push(index);
    } else {
      optionsCopy[newLabel] = {
        instances: [index],
      };
    }
    setOptions(optionsCopy);
  };

  const getProbabilities = () => {
    let optionsCopy = { ...options };
    for (let option in optionsCopy) {
      optionsCopy[option].probability = Math.round(
        (100 * optionsCopy[option].instances.length) / wedges.length
      );
    }

    setOptions(optionsCopy);
  };

  const handleProbabilities = (probs) => {
    setProbabilities(probs);
  };

  const addWedge = () => {
    const randomColor = generateColor();
    const wedgeCopy = [...wedges];
    const optionsCopy = { ...options };
    const wedgeProb = Math.round(3600 / (wedges.length + 1)) / 10;
    const total = Math.round(10 * wedgeProb * (wedges.length + 1)) / 10;
    let remainder = Math.round(10 * (360 - total)) / 10;
    let startAngle;

    for (let i = 0; i < wedgeCopy.length; i++) {
      startAngle =
        i !== 0
          ? Math.round(
              100 * (wedgeCopy[i - 1].startAngle + wedgeCopy[i - 1].size)
            ) / 100
          : 0;
      wedgeCopy[i].startAngle = startAngle;
      if (remainder > 0) {
        wedgeCopy[i].size = Math.round(10 * (wedgeProb + 0.1)) / 10;
        remainder = Math.round(10 * remainder - 1) / 10;
      } else if (remainder < 0) {
        wedgeCopy[i].size = Math.round(10 * (wedgeProb - 0.1)) / 10;
        remainder = Math.round(10 * remainder + 1) / 10;
      } else {
        wedgeCopy[i].size = wedgeProb;
      }
    }
    startAngle =
      wedgeCopy.length > 0
        ? Math.round(
            100 *
              (wedgeCopy[wedgeCopy.length - 1].startAngle +
                wedgeCopy[wedgeCopy.length - 1].size)
          ) / 100
        : 0;
    wedgeCopy.push({
      label: "",
      color: randomColor,
      startAngle: startAngle,
      size: wedgeProb,
    });

    if (optionsCopy[""]) {
      optionsCopy[""].instances.push(wedges.length);
    } else {
      optionsCopy[""] = { instances: [wedges.length] };
    }

    setWedges(wedgeCopy);
    setOptions(optionsCopy);
  };

  const selectWithWeights = () => {
    let roll;

    if (Object.keys(probabilities).length === 0) {
      roll = Math.floor(Math.random() * wedges.length);
      return wedges[roll];
    } else {
      roll = Math.ceil(Math.random() * 100);
      let count = 0;
      for (let key of Object.keys(probabilities)) {
        count += probabilities[key];
        if (roll <= count) {
          let indeces = options[key].instances;
          let index = Math.floor(Math.random() * indeces.length);
          return wedges[indeces[index]];
        }
      }
    }
  };

  const handleResults = (value) => {
    if (value) {
      setResults([...results, value]);
    } else {
      setResults([]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row",
        width: "100vw",
        height: "100vh",
      }}
    >
      <FlipMenu
        wedges={wedges}
        addWedge={addWedge}
        handleChange={handleWedgeData}
        calcProbabilities={getProbabilities}
        options={options}
        probabilities={probabilities}
        handleProbabilities={handleProbabilities}
        results={results}
        handleResults={handleResults}
      />
      <Spinner
        wedges={wedges}
        spin={selectWithWeights}
        handleResults={handleResults}
      />
    </div>
  );
}
