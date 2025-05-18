import React from "react";
import "../styles/home.css";
import Navbar from "../components/Navbar";
import sassy from "../assets/ChatGPT_Image_May_13__2025__02_28_35_PM-removebg-preview.png";

export default function Home() {
  function greeting() {
    return (
      <>
        <div id="greeting-wrapper">
          <h1 id="greeting-text-wrapper">
            Thinking is hard... Letting AI think for you is easy! Find your
            dream career today with Career Helpi!
          </h1>
        </div>
      </>
    );
  }

  function add_names() {
    return (
      <div id="names-wrapper">
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

  function no_api_key() {
    return (
      <>
        <div id="footer-wrapper">
          <h1 id="footer-text">
            No need for an api key! Career Helpi is powered by{" "}
            <a
              id="footer-link"
              href="https://github.com/dmihovch/career-helpi-backend"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vercel Serverless Functions
            </a>
          </h1>
        </div>
      </>
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
          {greeting()}
        </div>
        {no_api_key()}
        {add_names()}
      </body>
    </div>
  );
}
