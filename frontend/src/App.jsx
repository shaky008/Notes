import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Update from "./pages/Update";
import Add from "./pages/Add";
import Notes from "./pages/Notes";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
