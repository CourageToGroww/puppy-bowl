import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SeeDetails from "./components/SeeDetails";
import "./global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/players/:id" element={<SeeDetails />} />
        <Route path="/" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
