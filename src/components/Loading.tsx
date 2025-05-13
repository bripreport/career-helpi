import "../styles/loading.css";
import sassy from "../assets/ChatGPT_Image_May_13__2025__02_28_35_PM-removebg-preview.png";

function Loading() {
  return (
    <>
      <h1 id="loading-text">Loading...</h1>
      <img className="loading" src={sassy} alt="loading..." />
    </>
  );
}
export default Loading;
