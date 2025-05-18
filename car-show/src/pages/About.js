import React from "react";
import Navbar from "../components/Navbar";
import "../styles/about.css";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="about-hero">
          <h1>About CareerDrift</h1>
          <p>Your journey, your pace. We help you discover what drives you.</p>
        </div>

        <div className="about-content">
          <h2>Our Mission</h2>
          <p>
            CareerDrift was created to empower students and early professionals to make informed,
            confident decisions about their careers. We use AI-driven tools to help you discover
            personalized career paths based on your skills, values, and interests.
          </p>

          <h2>What We Offer</h2>
          <ul>
            <li>Personalized career quizzes with smart recommendations</li>
            <li>Actionable next steps and industry insights</li>
            <li>A clean, intuitive platform tailored to you</li>
          </ul>

          <h2>Why CareerDrift?</h2>
          <p>
            We believe career planning shouldn't be overwhelming. Whether you're feeling unsure, 
            exploring options, or ready to take the next step, CareerDrift is here to guide you 
            with clarity and confidence.
          </p>
        </div>
        <h2>What Our Users Say</h2>
        <blockquote>
        "CareerDrift helped me realize I’m more than my major — I discovered a whole new path!"
        </blockquote>
        <h2>Meet the Creator</h2>
        <div className="team-grid">
  <div className="team-member">
    <img src="/team/daniah.jpeg" alt="Daniah Jones" />
    <p>Daniah Jones</p>
  </div>
  <div className="team-member">
    <img src="/team/kejae.jpeg" alt="Kejae Fletcher" />
    <p>Kejae Fletcher</p>
  </div>
  <div className="team-member">
    <img src="/team/Brijish.jpeg" alt="Brijesh Pachala" />
    <p>Brijesh Pachala</p>
  </div>
  <div className="team-member">
    <img src="/team/Dan.jpeg" alt="Daniel Mihovch" />
    <p>Daniel Mihovch</p>
    </div>
    </div>

        <div className="cta">
        <p>Ready to find your next step?</p>
        <a href="/basicquiz" className="start-btn">Take the Career Quiz</a>
        </div>
      </div>
    </>
  );
}

