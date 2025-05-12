import "../styles/loading.css";
import sassy from "../assets/sassy.jpg";

function Loading() {
  return (
    <>
      <h1>Loading...</h1>
      <img className="loading" src={sassy} alt="loading..." />
    </>
  );
}
export default Loading;
