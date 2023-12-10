export function Results({ results, handleResults }) {
  const clear = () => {
    handleResults();
  };
  const resultsMarkup = results.map((result) => <li>{result}</li>);
  return (
    <div>
      <div className="resultBoxContainer">
        <ol>{resultsMarkup}</ol>
      </div>
      <div className="menuButtons">
        <button className="menuButton" onClick={clear}>
          Clear
        </button>
      </div>
    </div>
  );
}
