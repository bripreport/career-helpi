import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/basic-assessment.css";
import ProgressBar from "../components/ProgressBar";

type QuestionType = {
  type: "option" | "scale";
  question: string;
  options?: string[];
};

const quizQuestions: QuestionType[] = [
  {
    type: "option",
    question: "Which activity is the most appealing to you?",
    options: ["Building/fixing things", "Solving puzzles", "Creating art or music", "Working with animals"],
  },
  {
    type: "option",
    question: "What role do you take on in a team project?",
    options: ["The Leader", "Team Player", "The Creative", "The Researcher", "The Planner"],
  },
  {
    type: "option",
    question: "What is your highest or current level of education?",
    options: ["High School", "Some College", "Bachelor's Degree", "Master's Degree", "PhD/Doctorate"],
  },
  {
    type: "option",
    question: "What is your preferred work environment?",
    options: ["Office", "Remote", "Outdoor", "Laboratory", "Studio"],
  },
  {
    type: "option",
    question: "What is your ideal work schedule?",
    options: ["9-5", "Flexible", "Shifts", "Freelance", "Part-time"],
  },
  // {
  //   type: "option",
  //   question: "What motivates you the most in a job?",
  //   options: ["Helping others", "Learning new things", "Making money", "Working independently", "Being creative"],
  // },
  // {
  //   type: "scale",
  //   question: "How much do you enjoy learning a new skill?",
  // },
  {
    type: "scale",
    question: "How confident are you with technology?",
  },
  {
    type: "scale",
    question: "How comfortable are you with public speaking or presenting?",
  },
  {
    type: "scale",
    question: "How much do you like working with numbers or data?",
  },
  {
    type: "scale",
    question: "How well do you work in a team?",
  },
  {
    type: "scale",
    question: "How important is work-life balance to you?",
  },
];

const scaleOptions = ["Not at all", "Slightly", "Neutral/Unsure", "Somewhat", "Very"];

function BasicAssessment(): React.JSX.Element {
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const message = inProgress
    ? "Answer the following questions to the best of your ability. Click 'Next' to proceed."
    : showResults
    ? "Thank you for completing the quiz!"
    : "Welcome to the Basic Career Quiz. This quiz will help you identify your strengths and preferences. Click 'Start' to begin.";

  const startQuiz = () => {
    setInProgress(true);
    setCurrentQuestion(0);
    setAnswers(quizQuestions.map(() => ""));
    setShowResults(false);
  };

  const storeAnswers = (answer: string[]) => {
    localStorage.setItem("basic-quiz-answers", JSON.stringify(answer));
  }

  const current = quizQuestions[currentQuestion];
  const lastQuestion = currentQuestion === quizQuestions.length - 1;
  const completed = answers.filter((a) => a !== "").length;

  const selectAnswer = (answer: string) => {
    const addedAnswer = answers.map((a, i) => (i === currentQuestion ? answer : a));
    setAnswers(addedAnswer);
    if (lastQuestion) {
      setInProgress(false);
      setShowResults(true);
      storeAnswers(addedAnswer);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const getOptionsType = () =>
    current.type === "option" && current.options ? current.options : scaleOptions;

  

  const prevQuestion = () => setCurrentQuestion(currentQuestion - 1);

  return (
    <div id="basic-assessment-body">
      <header>
        <Navbar />
      </header>
      <h1>Basic Career Quiz</h1>
      <br />
      <h3 style={{ fontSize: "20px" }}>{message}</h3>
      <div id="basic-assessment-container">
        {!inProgress && !showResults && (
          <button id="start-button" onClick={startQuiz}>
            Start Quiz
          </button>
        )}
        {inProgress && (
          <div id="quiz-card">
            <ProgressBar questions={quizQuestions.length} answered={completed} />

            <p id="question-number">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </p>
            <p id="question">{current.question}</p>

            <div id= "options-container">
              {getOptionsType().map((option) =>(
                <button key={option} onClick={() => selectAnswer(option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentQuestion > 0 && inProgress && (
          <button id="prev-button" onClick={prevQuestion}>
            Previous
          </button>
        )}

        {showResults && !inProgress && (
          <div id= "results-card">
            <button onClick={startQuiz}> Restart Quiz</button>

            <ul>
              {quizQuestions.map((question, index) => (
                <li key={index}>
                  <strong>Q: </strong> {question.question} <br />
                  <strong>A: </strong> {answers[index]}
                </li>
              ))}
            </ul>

          </div>
        )}

      </div>
    </div>
  );
}

export default BasicAssessment;
