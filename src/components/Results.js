export function Results({ results }) {
  const resultsMarkup = results.map((result) => <li>{result}</li>);
  return (
    <div className="resultBoxContainer">
      <div className="resultBox">
        <ol>{resultsMarkup}</ol>
      </div>
    </div>
  );
}
