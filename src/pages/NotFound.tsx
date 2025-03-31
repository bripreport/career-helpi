import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/not-found.css";

function NotFound() {
  const nav = useNavigate();
  return (
    <div id="not-found-body">
      <div id="not-found-container">
        <h1>Page not Found!</h1>
        <p>
          Either you tried to navigate to a page that doesn't exist, or our
          dumbasses screwed something up!
        </p>
        <Button
          onClick={() => {
            nav("/");
          }}
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
