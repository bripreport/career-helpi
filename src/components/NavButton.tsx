import { Button } from "react-bootstrap";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";

type NavButtonProps = {
  path: string;
  text: string;
};

function NavButton({ path, text }: NavButtonProps) {
  const nav = useNavigate();
  return (
    <Button
      className="nav-button"
      onClick={() => {
        nav(path);
      }}
    >
      {text}
    </Button>
  );
}

export default NavButton;
