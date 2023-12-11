export function Results({ results, handleResults }) {
  const clear = () => {
    handleResults();
  };
  const resultsMarkup = results.map((result) => <li>{result}</li>);
  return (
    <div>
      <div className="resultBoxContainer">
        <ul>{resultsMarkup}</ul>
      </div>
      <div className="menuButtons">
        <button className="menuButton" onClick={clear}>
          Clear
        </button>
      </div>
    </div>
  );
}
