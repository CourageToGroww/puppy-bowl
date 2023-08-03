import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllPlayers from "./components/AllPlayers";
import SeeDetails from "./components/SeeDetails";
import "./global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/players/:id" element={<SeeDetails />} />
        <Route path="/" element={<AllPlayers />} />
      </Routes>
    </Router>
  );
}

export default App;
