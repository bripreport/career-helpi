import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/basic-assessment.css";
import ProgressBar from "../components/ProgressBar";

type QuestionType = {
  type: "option" | "rating";
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
    type: "rating",
    question: "How much do you enjoy learning a new skill?",
  },

  {//8
    type: "rating",
    question: "How confident are you with technology?",
  },

  {//9
    type: "rating",
    question: "How comfortable are you with public speaking or presenting?",

  },

  {//10
    type: "rating",
    question: "How much do you enjoy working with numbers or data?",

  },

  {//11
    type: "rating",
    question: "How well do you work in a team?",
  },

  {//12
    type : "rating",
    question: "How important is work-life balance to you?",

  },
]



function BasicAssessment(): React.JSX.Element {
  const message =
    "Welcome to the Basic Career Assessment! This assessment shouldn't take long, and in just a few quick answers we should be able to match you with a career. If you wish for a more in depth assessment, try our Detailed Career Assessment!";
  return (
    <div id="basic-assess-body">
      <header>
        <Navbar />
      </header>
      <div id="basic-assessment-container">
        <h1>Basic Career Assessment</h1>
        <br></br>
        <h3>{message}</h3>
      </div>
    </div>
  );
}

export default BasicAssessment;
