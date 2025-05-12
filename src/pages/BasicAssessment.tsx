import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/basic-assessment.css";
import ProgressBar from "../components/ProgressBar";
import { promptChatGpt } from "../api-functions/api-functions";
import Loading from "../components/Loading";

type QuestionType = {
  type: "option" | "scale";
  question: string;
  options?: string[];
};

const quizQuestions: QuestionType[] = [
  {
    type: "option",
    question: "Which activity is the most appealing to you?",
    options: [
      "Building/fixing things",
      "Solving puzzles",
      "Creating art or music",
      "Volunteering",
      "Working with animals",
    ],
  },
  {
    type: "option",
    question: "What role do you take on in a team project?",
    options: [
      "The Leader",
      "Team Player",
      "The Creative",
      "The Researcher",
      "The Planner",
    ],
  },
  {
    type: "option",
    question: "What is your highest or current level of education?",
    options: [
      "High School",
      "Some College",
      "Bachelor's Degree",
      "Master's Degree",
      "PhD/Doctorate",
    ],
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

const scaleOptions = [
  "Not at all",
  "Slightly",
  "Neutral/Unsure",
  "Somewhat",
  "Very",
];

function BasicAssessment(): React.JSX.Element {
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [gptResponse, setGptResponse] = useState<string>("");
  const [showResponse, setShowResponse] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const message = inProgress
    ? "Answer the following questions to the best of your ability. Selecting an option will automatically take you to the next question."
    : showResults
      ? "Thank you for completing the quiz!"
      : "Welcome to the Basic Career Quiz. This quiz will help you identify your strengths and preferences. Click 'Start' to begin.";

  const startQuiz = () => {
    setInProgress(true);
    setCurrentQuestion(0);
    setAnswers(quizQuestions.map(() => ""));
    setShowResults(false);
    setGptResponse("");
    setShowResponse(false);
  };

  const storeAnswers = (answer: string[]) => {
    localStorage.setItem("basic-quiz-answers", JSON.stringify(answer));
  };

  const validateAnswers = (answers: string[]): boolean => {
    return answers.every((answer) => answer !== "");
  };

  const current = quizQuestions[currentQuestion];
  const lastQuestion = currentQuestion === quizQuestions.length - 1;
  const completed = answers.filter((a) => a !== "").length;

  const selectAnswer = (answer: string) => {
    const addedAnswer = answers.map((a, i) =>
      i === currentQuestion ? answer : a,
    );
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
    current.type === "option" && current.options
      ? current.options
      : scaleOptions;

  const prevQuestion = () => setCurrentQuestion(currentQuestion - 1);

  const handleResults = async () => {
    setLoading(true);
    await promptChatGpt(
      quizQuestions.map((q) => q.question),
      answers,
    )
      .then((response) => {
        setGptResponse(response);
        setLoading(false);
        setShowResponse(true);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error prompting ChatGPT:", error);
        alert(
          "An error occurred while processing your request. Please try again later.",
        );
      });
    setLoading(false);
  };

  return (
    <div id="basic-assessment-body">
      <header>
        <Navbar />
      </header>
      <div id="basic-assessment-container">
        {loading ? (
          <Loading /> //todo: add loading animation
        ) : (
          <>
            {!showResponse && (
              <>
                <h1>Basic Career Quiz</h1>
                <h3 style={{ fontSize: "20px" }}>{message}</h3>
              </>
            )}
            {!inProgress && !showResults && (
              <button id="start-button" onClick={startQuiz}>
                Start Quiz
              </button>
            )}
            {inProgress && (
              <div id="quiz-card">
                <div id="progress-bar-container">
                  <ProgressBar
                    questions={quizQuestions.length}
                    answered={completed}
                  />
                </div>
                <p id="question-number">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </p>
                <p id="question">{current.question}</p>

                <div id="options-container">
                  {getOptionsType().map((option) => (
                    <button
                      key={option}
                      onClick={() => selectAnswer(option)}
                      className={
                        answers[currentQuestion] === option ? "selected" : ""
                      }
                    >
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
            {showResults && !inProgress && !showResponse && (
              <div id="results-card">
                <ul>
                  {quizQuestions.map((question, index) => (
                    <li key={index}>
                      <strong>Q: </strong> {question.question} <br />
                      <strong>A: </strong> {answers[index]}
                    </li>
                  ))}
                </ul>

                <div id="restart-button-container">
                  <button onClick={startQuiz}> Restart Quiz</button>
                </div>

                <button id="submit-button" onClick={handleResults}>
                  Get My Career Match!
                </button>
              </div>
            )}
            {showResponse && (
              <>
                <h3>Career Match Results</h3>
                <div id="gpt-response-card">
                  <pre id="gpt-response-text">{gptResponse}</pre>
                  <button id="restart-button" onClick={startQuiz}>
                    Restart Quiz
                  </button>
                </div>
              </>
            )}{" "}
          </>
        )}
      </div>
    </div>
  );
}

export default BasicAssessment;
