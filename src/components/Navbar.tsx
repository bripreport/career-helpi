import "../styles/navbar.css";
import NavButton from "./NavButton";

function Navbar() {
  return (
    <nav>
      <NavButton path="/" text="Home" />
      <NavButton path="/basic-assessment" text="Basic Assessment" />
      <NavButton path="/detailed-assessment" text="Detailed Assessment" />
      <NavButton path="/test" text="Dev-test" />
    </nav>
  );
}

export default Navbar;
