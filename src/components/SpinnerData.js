import { useCallback, useEffect, useState } from "react";
import { FlipMenu } from "./FlipMenu";
import { Spinner } from "./Spinner";

export function SpinnerData() {
  const [options, setOptions] = useState(
    JSON.parse(window.localStorage.getItem("options")) || { "": [0, 1] }
  );
  const [probabilities, setProbabilities] = useState(
    JSON.parse(window.localStorage.getItem("probabilities")) || {}
  );
  const [results, setResults] = useState([]);
  const generateColor = () => {
    let letters = "0123456789ABCDEF";

    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const [wedges, setWedges] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem("wedges")) || [
        {
          label: "",
          color: generateColor(),
          startAngle: 0,
          size: 180,
        },
        {
          label: "",
          color: generateColor(),
          startAngle: 180,
          size: 180,
        },
      ]
    );
  });

  useEffect(() => {
    window.localStorage.setItem("wedges", JSON.stringify(wedges));
  }, [wedges]);

  useEffect(() => {
    window.localStorage.setItem("options", JSON.stringify(options));
  }, [options]);

  useEffect(() => {
    window.localStorage.setItem("probabilities", JSON.stringify(probabilities));
  }, [probabilities]);

  const handleOptionData = (newLabel, index) => {
    let optionsCopy = { ...options };
    let oldLabel = wedges[index].label;

    if (optionsCopy[oldLabel]) {
      let oldInstances = optionsCopy[oldLabel];
      optionsCopy[oldLabel] = oldInstances.filter((i) => i !== index);
      if (optionsCopy[oldLabel].length === 0) {
        delete optionsCopy[oldLabel];
        let probsCopy = { ...probabilities };
        delete probsCopy[oldLabel];
        setProbabilities(probsCopy);
      }
    }
    if (optionsCopy[newLabel]) {
      optionsCopy[newLabel].push(index);
    } else {
      optionsCopy[newLabel] = [index];
    }
    setOptions(optionsCopy);
  };

  const calculatePropability = (option) => {
    return Math.round((100 * option.length) / wedges.length);
  };

  const handleProbabilities = useCallback((probs) => {
    setProbabilities(probs);
  }, []);

  const adjustWedgeSizes = (wedgeCopy) => {
    const wedgeProb = Math.round(3600 / wedgeCopy.length) / 10;
    let startAngle;
    const total = Math.round(10 * wedgeProb * wedgeCopy.length) / 10;
    let remainder = Math.round(10 * (360 - total)) / 10;

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
    return wedgeCopy;
  };

  const addWedge = () => {
    const randomColor = generateColor();
    let wedgeCopy = [...wedges];
    const optionsCopy = { ...options };

    wedgeCopy.push({
      label: "",
      color: randomColor,
    });

    wedgeCopy = adjustWedgeSizes(wedgeCopy);

    if (optionsCopy[""]) {
      optionsCopy[""].push(wedges.length);
    } else {
      optionsCopy[""] = [wedges.length];
    }

    setWedges(wedgeCopy);
    setOptions(optionsCopy);
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

  const deleteWedge = (index) => {
    let wedgesCopy = wedges.filter((value, i) => i !== index);
    wedgesCopy = adjustWedgeSizes(wedgesCopy);
    let newOptions = {};
    for (let ind = 0; ind < wedgesCopy.length; ind++) {
      let key = wedgesCopy[ind].label;
      if (newOptions[key]) {
        newOptions[key].push(ind);
      } else {
        newOptions[key] = [ind];
      }
    }
    setWedges(wedgesCopy);
    setOptions(newOptions);
  };

  const clearWedges = () => {
    setWedges([
      {
        label: "",
        color: generateColor(),
        startAngle: 0,
        size: 180,
      },
      {
        label: "",
        color: generateColor(),
        startAngle: 180,
        size: 180,
      },
    ]);
    setOptions({ "": [0, 1] });
    setProbabilities({});
    setResults([]);
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
          let indeces = options[key];
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
        handleDelete={deleteWedge}
        clearWedges={clearWedges}
        getProbability={calculatePropability}
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
