import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BasicAssessment from "./pages/BasicAssessment";
import NotFound from "./pages/NotFound";
import DetailedAssessment from "./pages/DetailedAssessment";
import Testing from "./pages/Testing";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basic-assessment" element={<BasicAssessment />} />
        <Route path="/detailed-assessment" element={<DetailedAssessment />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/test" element={<Testing />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
