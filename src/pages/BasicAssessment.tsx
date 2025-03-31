import Navbar from "../components/Navbar";
import "../styles/basic-assessment.css";

function BasicAssessment() {
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
