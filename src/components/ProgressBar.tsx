import "../styles/progress-bar.css";

//pass in the total amount of questions (questions) and the amount currently answered (answered) as props, and lift the state of answered questions to the parent component

type ProgressBarProps = {
  questions: number;
  answered: number;
};

function calcPercentageProgress({
  questions,
  answered,
}: ProgressBarProps): number {
  const percentage = Math.ceil((answered / questions) * 100);
  if (answered > questions) {
    return 100;
  }
  if (answered !== questions && percentage === 100) {
    return 99;
  }

  return percentage;
}

function ProgressBar({ questions, answered }: ProgressBarProps) {
  return (
    <div id="progress-bar-wrapper">
      <div
        id="progress-bar"
        style={{ width: `${calcPercentageProgress({ questions, answered })}%` }}
      ></div>
      <p id="percentage">{calcPercentageProgress({ questions, answered })}%</p>
    </div>
  );
}

export default ProgressBar;
