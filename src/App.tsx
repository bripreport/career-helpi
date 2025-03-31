import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BasicAssessment from "./pages/BasicAssessment";
import NotFound from "./pages/NotFound";
import DetailedAssessment from "./pages/DetailedAssessment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basic-assessment" element={<BasicAssessment />} />
        <Route path="/detailed-assessment" element={<DetailedAssessment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
