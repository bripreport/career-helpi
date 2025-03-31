import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Form } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BasicAssessment from "./pages/BasicAssessment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basic-assessment" element={<BasicAssessment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
