import "../styles/navbar.css";
import NavButton from "./NavButton";

function Navbar() {
  return (
    <nav>
      <NavButton path="/" text="Home" />
      <NavButton path="/basic-assessment" text="Basic Assessment" />
      <NavButton path="/detailed-assessment" text="Detailed Assessment" />
      <NavButton path="/reports" text="Reports" />
    </nav>
  );
}

export default Navbar;
