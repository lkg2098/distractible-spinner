import { useState } from "react";
import { ProbabilitiesList } from "./ProbabilitiesList";
import { Spinner } from "./Spinner";
import { WedgeList } from "./WedgeList";

export function SpinnerData() {
  const [wedges, setWedges] = useState([]);
  const [options, setOptions] = useState({});
  const [probabilities, setProbabilities] = useState({});

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
    if (event.target.name == "label") {
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
      optionsCopy[oldLabel].instances = oldInstances.filter((i) => i != index);
      if (optionsCopy[oldLabel].instances.length == 0) {
        delete optionsCopy[oldLabel];
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
    let startAngle;

    for (let i = 0; i < wedgeCopy.length; i++) {
      wedgeCopy[i].size = wedgeProb;
      startAngle =
        i != 0
          ? Math.round(
              100 * (wedgeCopy[i - 1].startAngle + wedgeCopy[i - 1].size)
            ) / 100
          : 0;
      wedgeCopy[i].startAngle = startAngle;
    }
    const remainingSpace = (360 - wedgeProb * wedges.length).toFixed(1);
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
      size: wedgeProb != remainingSpace ? remainingSpace : wedgeProb,
    });

    if (optionsCopy[""]) {
      optionsCopy[""].instances.push(wedges.length);
    } else {
      optionsCopy[""] = { instances: [wedges.length] };
    }

    setWedges(wedgeCopy);
    setOptions(optionsCopy);
  };
  const [newRoll, setNewRoll] = useState(0);
  const selectWithWeights = () => {
    let roll = Math.ceil(Math.random() * 100);

    let count = 0;
    for (let key of Object.keys(probabilities)) {
      count += probabilities[key];
      if (roll <= count) {
        setNewRoll(roll + " " + count + " " + key);
        let indeces = options[key].instances;
        let index = Math.floor(Math.random() * indeces.length);
        return wedges[indeces[index]];
      }
    }
  };

  return (
    <div style={{ display: "flex", flexFlow: "row" }}>
      <Spinner wedges={wedges} spin={selectWithWeights} />
      <div style={{ display: "flex", flexFlow: "column" }}>
        <WedgeList
          wedges={wedges}
          addWedge={addWedge}
          handleChange={handleWedgeData}
          handleProbabilities={getProbabilities}
        />
        {newRoll}
        {JSON.stringify(probabilities)}
      </div>
      <ProbabilitiesList
        options={options}
        probabilities={probabilities}
        handleProbabilities={handleProbabilities}
      />
    </div>
  );
}
