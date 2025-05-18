import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/detailed-assessment.css";
import ProgressBar from "../components/ProgressBar";
import { promptChatGpt } from "../api-functions/api-functions";
import Loading from "../components/Loading";
import { createReport } from "../utils/createReports";

type DetailedQuestion = {
  question: string;
};

const detailedQuestions: DetailedQuestion[] = [
  { question: "Tell us about a project or experience you're most proud of." },
  { question: "What are your strongest skills or strengths?" },
  { question: "What kind of work environment do you thrive in, and why?" },
  { question: "Describe a time you solved a difficult problem." },
  { question: "What motivates you in your career or personal life?" },
  { question: "What is your biggest career goal right now?" },
  { question: "What are some areas where you'd like to improve?" },
];

function DetailedAssessment(): React.JSX.Element {
  const [inProgress, setInProgress] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [gptResponse, setGptResponse] = useState<string>("");
  const [showResponse, setShowResponse] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const message = inProgress
    ? "Answer the questions in your own words. Click 'Next' to continue."
    : showResults
      ? "Thanks for completing the quiz!"
      : "Welcome to the Detailed Career Quiz. This assessment will take a bit longer than the Basic Quiz, but will yield more accurate results! Click 'Start' to begin.";

  const startQuiz = () => {
    setInProgress(true);
    setCurrentQuestion(0);
    setAnswers(detailedQuestions.map(() => ""));
    setShowResults(false);
    setGptResponse("");
    setShowResponse(false);
  };

  const storeAnswers = (answer: string[]) => {
    localStorage.setItem("detailed-quiz-answers", JSON.stringify(answer));
  };

  const lastQuestion = currentQuestion === detailedQuestions.length - 1;
  const completed = currentQuestion;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updated = answers.map((a, i) =>
      i === currentQuestion ? e.target.value : a,
    );
    setAnswers(updated);
  };

  const nextQuestion = () => {
    if (lastQuestion) {
      setInProgress(false);
      setShowResults(true);
      storeAnswers(answers);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleResults = async () => {
    setLoading(true);
    await promptChatGpt(
      detailedQuestions.map((q) => q.question),
      answers,
    )
      .then((response) => {
        setGptResponse(response);
        createReport("Detailed Quiz", response);
        setShowResponse(true);
        
      })
      .catch((error) => {
        console.error("Error fetching GPT response:", error);
        alert(
          "An error occurred while fetching the response. Please try again.",
        );
      })
      .finally(() => setLoading(false));
    
  };

  return (
    <div id="detailed-assessment-body">
      <header>
        <Navbar />
      </header>
      <div id="detailed-assessment-container">
        {loading ? (
          <Loading />
        ) : (
          <>
            {!showResponse && (
              <>
                <h1>Detailed Career Quiz</h1>
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
                    questions={detailedQuestions.length}
                    answered={completed}
                  />
                </div>
                <p id="question-number">
                  Question {currentQuestion + 1} of {detailedQuestions.length}
                </p>
                <p id="question">
                  {detailedQuestions[currentQuestion].question}
                </p>
                <textarea
                  id="text-input"
                  value={answers[currentQuestion]}
                  onChange={handleInputChange}
                  placeholder="Type your answer..."
                  rows={5}
                />
                <div>
                  {currentQuestion > 0 && (
                    <button id="prev-button" onClick={prevQuestion}>
                      Previous
                    </button>
                  )}
                  <button
                    id="next-button"
                    onClick={nextQuestion}
                    disabled={answers[currentQuestion].trim() === ""}
                  >
                    {lastQuestion ? "Submit" : "Next"}
                  </button>
                </div>
              </div>
            )}

            {showResults && !inProgress && !showResponse && (
              <>
                <div id="results-card">
                  <ul>
                    {detailedQuestions.map((question, index) => (
                      <li key={index}>
                        <strong>Q: </strong> {question.question}
                        <br />
                        <strong>A: </strong> {answers[index]}
                      </li>
                    ))}
                  </ul>
                </div>
                <div id="restart-button-container">
                  <button onClick={startQuiz}>Restart Quiz</button>
                </div>

                <button id="submit-button" onClick={handleResults}>
                  Get My Career Match!
                </button>
              </>
            )}

            {showResponse && (
              <div id="gpt-response-card">
                <h3>Career Match Results</h3>
                <pre id="gpt-response-text">{gptResponse}</pre>
                <button id="restart-button" onClick={startQuiz}>
                  Restart Quiz
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default DetailedAssessment;
