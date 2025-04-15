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
  {//1
    type: "option",
    question: "Which activity is the most appealing to you?",
    options: ["Building/fixing things", "Solving puzzles", "Creating art or music", "Working with animals"]
  },

  {//2
    type:"option",
    question: "What role do you take on in a team project?",
    options: ["The Leader", "Team Player", "The Creative", "The Researcher", "The Planner"]
  },

  {//3
    type: "option",
    question: "What is your highest or current level of education?",
    options: ["High School", "Some College", "Bachelor's Degree", "Master's Degree", "PhD/Doctorate"]
  },

  {//4
    type: "option",
    question: "What is your preferred work environment?",
    options: ["Office", "Remote", "Outdoor", "Laboratory", "Studio"]

  },

  {//5
    type: "option",
    question: "What is your ideal work schedule?",
    options: ["9-5", "Flexible", "Shifts", "Freelance", "Part-time"]

  },

  {//6
    type: "option",
    question: "What motivates you the most in a job?",
    options: ["Helping others", "Learning new things", "Making money", "Working independently", "Being creative"]

  },

  {//7
    type: "scale",
    question: "How much do you enjoy learning a new skill?",
  },

  {//8
    type: "scale",
    question: "How confident are you with technology?",
  },

  {//9
    type: "scale",
    question: "How comfortable are you with public speaking or presenting?",
  },

  {//10
    type: "scale",
    question: "How much do you enjoy working with numbers or data?",
  },

  {//11
    type: "scale",
    question: "How well do you work in a team?",
  },

  {//12
    type : "scale",
    question: "How important is work-life balance to you?",
  },
]


function BasicAssessment(): React.JSX.Element {
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<(string | number)[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);


  const message = inProgress
    ? "Answer the following questions to the best of your ability. Click 'Next' to proceed."
    : "Welcome to the Basic Career Quiz This quiz will help you identify your strengths and preferences. Click 'Start' to begin.";

    const startQuiz = () => {
      setInProgress(true);
      setCurrentQuestion(0);
      setAnswers(quizQuestions.map(() => " "));
      setShowResults(false);
    }

    const current = quizQuestions[currentQuestion];
    const lastQuestion = currentQuestion === quizQuestions.length - 1;
    const completed = answers.filter((a) => a !== " ").length

    const selectAnswer = (answer:string) => {
      setAnswers(answers.map((a, i) => (i === currentQuestion ? answer : a)));
      lastQuestion ? setInProgress(false) : setCurrentQuestion(currentQuestion + 1);
      setShowResults(lastQuestion);
    }

    const prevQuestion = () => setCurrentQuestion(currentQuestion - 1);


  return (
    <div id="basic-assessment-body">
      <header>
        <Navbar />
      </header>
      <h1>Basic Career Quiz</h1>
        <br></br>
        <h3 style={{fontSize:"20px"}}>{message}</h3>
      <div id="basic-assessment-container">
        {!inProgress && !showResults && (
          <button id="start-button" onClick={startQuiz}>
            Start Quiz
          </button>
        )}
        {inProgress && (
          <div id="quiz-card">
            <ProgressBar questions ={quizQuestions.length} answered={completed}/>

            <p id= "question-number">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </p>
            <p id="question">{current.question}</p>
            
            {current.type === "option" && (
              <div id="option-container">
                {current.options?.map((option) => (
                  <button key={option} onClick={() => selectAnswer(option)}>
                    {option}
                  </button>
                ))}
              </div>
            )}

            {current.type === "scale" && (
                <div id="scale-container">
                  <div>
                  <input
                  type="range"
                  min={1}
                  max={5}
                  value={answers[currentQuestion] || 3}
                  onChange={(e) => {
                  const value = Number(e.target.value);
                  setAnswers(answers.map((a, i) => (i === currentQuestion ? value : a)));
                  }}
                />
                <button disabled = {answers[currentQuestion] === " "}
                onClick={() => {
                  lastQuestion ? setInProgress(false) : setCurrentQuestion(currentQuestion + 1);
                  setShowResults(lastQuestion);
                }}
                >
                  Confirm 
                </button>
              </div>
                <p>Selected: {answers[currentQuestion] !== " " ? answers[currentQuestion] : "none"} </p>
            </div>
                
          )}

          </div>
        )}

        {currentQuestion > 0 && inProgress && (
          <button id="prev-button" onClick={prevQuestion}>
            Previous
          </button>
        )}


      </div>
      
    </div>
  );
}

export default BasicAssessment;