import "../styles/progress-bar.css";

function calcPercentageProgress({ questions, answered }) {
  const percentage = Math.ceil((answered / questions) * 100);
  if (answered > questions) {
    return 100;
  }
  if (answered !== questions && percentage === 100) {
    return 99;
  }

  return percentage;
}

function ProgressBar({ questions, answered }) {
  return (
    <div id="progress-bar-wrapper">
      <div
        id="progress-bar"
        style={{ width: `${calcPercentageProgress({ questions, answered })}%` }}
      ></div>
      <p id="percentage">
        {calcPercentageProgress({ questions, answered })}%
      </p>
    </div>
  );
}

export default ProgressBar;
