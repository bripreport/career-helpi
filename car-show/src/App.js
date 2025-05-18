import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import About from "./pages/About";
import BasicQuiz from "./pages/BasicQuiz";
import DetailedQuiz from "./pages/DetailedQuiz";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import "./style.css";
import { Boxes } from "./Boxes";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { FloatingGrid } from "./FloatingGrid";
import { Rings } from "./Rings";

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <color args={[0, 0, 0]} attach="background" />
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>
      <spotLight color={[1, 0.25, 0.7]} intensity={1.5} angle={0.6} penumbra={0.5} position={[5, 5, 0]} castShadow shadow-bias={-0.0001} />
      <spotLight color={[0.14, 0.5, 1]} intensity={2} angle={0.6} penumbra={0.5} position={[-5, 5, 0]} castShadow shadow-bias={-0.0001} />
      <Ground />
      <FloatingGrid />
      <Boxes />
      <Rings />
      <EffectComposer>
        <Bloom blendFunction={BlendFunction.ADD} intensity={1.3} width={300} height={300} kernelSize={5} luminanceThreshold={0.15} luminanceSmoothing={0.025} />
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0005, 0.0012]} />
      </EffectComposer>
    </>
  );
}

// 👇 Page components
function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <Canvas shadows>
          <CarShow />
        </Canvas>
      </Suspense>
      <div className="overlay">
        <h1 className="hero-title">CareerDrift</h1>
        <p className="hero-subtitle">Steer your future. Slide into what’s next.</p>
        <a href="#basic-quiz" className="hero-button">Start Now</a>
      </div>
    </>
  );
}

function App() {
  const [page, setPage] = useState(window.location.hash || "#home");

  useEffect(() => {
    const handleHashChange = () => setPage(window.location.hash || "#home");
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo-container">
          <img src="/logo.png" alt="logo" className="logo-image" />
          <span className="logo-text">CareerDrift</span>
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#detailed-quiz">Detailed Quiz</a></li>
          <li><a href="#basic-quiz" className="nav-button">Basic Quiz</a></li>
        </ul>
      </nav>

      {/* Render the "active" page */}
      {page === "#home" && <Home />}
      {page === "#about" && <About />}
      {page === "#basic-quiz" && <BasicQuiz />}
      {page === "#detailed-quiz" && <DetailedQuiz />}
    </div>
  );
}

export default App;
