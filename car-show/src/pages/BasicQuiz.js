import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/basic-assessment.css";
import ProgressBar from "../components/ProgressBar";
import { promptChatGpt } from "../api-functions/api-functions";
import Loading from "../components/Loading";

const quizQuestions = [
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

function BasicAssessment() {
  const [inProgress, setInProgress] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [gptResponse, setGptResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCar, setShowCar] = useState(true);


  const message = inProgress
    ? "Answer the following questions to the best of your ability. Selecting an option will automatically take you to the next question."
    : showResults
    ? "Thank you for completing the quiz!"
    : "Welcome to the Basic Career Quiz. This quiz will help you identify your strengths and preferences. Click 'Start' to begin.";

    

  const storeAnswers = (answerArray) => {
    localStorage.setItem("basic-quiz-answers", JSON.stringify(answerArray));
  };
  const startQuiz = () => {
    setShowCar(false); // if you've added this
    setInProgress(true);
    setCurrentQuestion(0);
    setAnswers(quizQuestions.map(() => ""));
    setShowResults(false);
    setGptResponse("");
    setShowResponse(false);
  };
  
  const current = quizQuestions[currentQuestion];
  const lastQuestion = currentQuestion === quizQuestions.length - 1;
  const completed = answers.filter((a) => a !== "").length;

  const selectAnswer = (answer) => {
    const updatedAnswers = answers.map((a, i) =>
      i === currentQuestion ? answer : a
    );
    setAnswers(updatedAnswers);
    if (lastQuestion) {
      setInProgress(false);
      setShowResults(true);
      storeAnswers(updatedAnswers);
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
    try {
      const response = await promptChatGpt(
        quizQuestions.map((q) => q.question),
        answers
      );
      setGptResponse(response);
      setShowResponse(true);
    } catch (error) {
      console.error("Error prompting ChatGPT:", error);
      alert("An error occurred while processing your request. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="basic-assessment-body">

      <header>
        <Navbar />
      </header>
      {showCar && (
     <div className="car-animation">
    <div className="car-wrapper">
      <div className="car-trail"></div>
      <img src="/car.png" alt="Moving car" className="car" />
    </div>
    </div>
)}


      <div id="basic-assessment-container">
        {loading ? (
          <Loading />
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
                  <button onClick={startQuiz}>Restart Quiz</button>
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
            )}
          </>
        )}
      </div>

    </div>
  );
}

export default BasicAssessment;

