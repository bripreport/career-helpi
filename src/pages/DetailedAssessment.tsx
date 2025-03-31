import Navbar from "../components/Navbar";
import "../styles/detailed-assessment.css";

function DetailedAssessment() {
  const message =
    "Welcome to the Detailed Career Assessment! This assessment will take a bit longer than the Basic Assessment, but will yield more accurate results! If you don't want to spend as much time on the quiz, take our Basic Career Assessment!";
  return (
    <div id="detailed-assess-body">
      <header>
        <Navbar />
      </header>
      <div id="detailed-assessment-container">
        <h1>Detailed Career Assessment</h1>
        <h3>{message}</h3>
      </div>
    </div>
  );
}

export default DetailedAssessment;
