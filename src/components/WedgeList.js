import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Results } from "./Results";

export function WedgeList({
  wedges,
  addWedge,
  handleDelete,
  handleChange,
  clearWedges,
  results,
  handleResults,
  handleTutorial,
}) {
  const [menu, setMenu] = useState(0);

  const deleteWedge = (e, ind) => {
    e.preventDefault();
    handleDelete(ind);
  };
  const fields = wedges.map((wedge, index) => {
    return (
      <div className="wedgeField">
        <input
          type={"text"}
          value={wedge.label}
          size={30}
          maxLength={20}
          name={"label"}
          placeholder={"Type option here..."}
          autoComplete="off"
          onChange={(e) => handleChange(e, index)}
        />
        <div
          style={{
            backgroundColor: wedge.color,
            border: "3px solid white",
            borderRadius: "3px",
            height: "1.2em",
            width: "2em",
            marginLeft: "0.5em",
            position: "relative",
          }}
        >
          <input
            type={"color"}
            value={wedge.color}
            name={"color"}
            onChange={(e) => handleChange(e, index)}
          />
        </div>
        <button
          className="iconButton"
          id="deleteWedge"
          onClick={(e) => deleteWedge(e, index)}
        >
          <FaTimes />
        </button>
      </div>
    );
  });

  const newWedge = () => {
    if (wedges.length === 2) {
      handleTutorial();
    }
    addWedge();
  };

  const toggleMenu = (menuNum) => {
    setMenu(menuNum);
  };
  const handleWedgesFull = () => {
    alert("You can have a maximum of 100 wedges!");
  };

  const menuMarkup =
    menu === 0 ? (
      <>
        <form className="resultBoxContainer">{fields}</form>
        <div className="menuButtons">
          <button
            className="menuButton"
            onClick={wedges.length < 100 ? newWedge : handleWedgesFull}
          >
            Add Wedge
          </button>
          <button className="menuButton" onClick={clearWedges}>
            Clear and Reset
          </button>
        </div>
      </>
    ) : (
      <Results results={results} handleResults={handleResults} />
    );
  return (
    <div className="fieldEditor">
      <menu>
        <li>
          <button disabled={menu === 0} onClick={() => toggleMenu(0)}>
            Options
          </button>
        </li>
        <li>
          <button disabled={menu === 1} onClick={() => toggleMenu(1)}>
            Results
          </button>
        </li>
      </menu>
      {menuMarkup}
    </div>
  );
}
