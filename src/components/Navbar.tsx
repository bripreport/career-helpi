import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { Button } from "react-bootstrap";

function Navbar() {
  const nav = useNavigate();
  return (
    <nav>
      <Button
        className="nav-button"
        onClick={() => {
          nav("/");
        }}
      >
        Home
      </Button>
      <Button
        className="nav-button"
        onClick={() => {
          nav("/basic-assessment ");
        }}
      >
        Basic Career Assessment
      </Button>
    </nav>
  );
}

export default Navbar;
