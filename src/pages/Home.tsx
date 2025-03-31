import React from "react";
import "../styles/home.css";
import Navbar from "../components/Navbar";
import sassy from "../assets/sassy.jpg";
import UserKeyInput from "../components/UserKeyInput";

export default function Home() {
  function add_names() {
    return (
      <div>
        <h3>Team Members:</h3>
        <p>Dan Mihovch</p>
        <p>Daniah Jones</p>
        <p>Brijesh Pachala</p>
        <p>Kejae Fletcher</p>
      </div>
    );
  }

  function add_logo() {
    //just a placeholder for an actual logo lol
    return (
      <div id="logo-wrapper">
        <img src={sassy} alt="A friendly sasquatch" />
      </div>
    );
  }

  return (
    <div className="home">
      <header>
        <Navbar />
      </header>
      <body>
        <div className="home-container">
          <div id="product-name-and-logo-wrapper">
            <h1>Career Helpi</h1>
            {add_logo()}
          </div>

          {add_names()}
        </div>
        <UserKeyInput />
      </body>
    </div>
  );
}
