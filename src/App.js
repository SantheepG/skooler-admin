import logo from "./logo.svg";
import "./App.css";
import Main from "./components/Main";
import Login from "./components/Login/Login";
import Main2 from "./components/Main2";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/admin" element={<Main />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
