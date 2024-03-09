import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import Login from "./components/Login/Login";
import { FetchSchool } from "./api/SchoolApi";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const base_URL = "http://127.0.0.1:8000/api"; //URL for school DB
export const base_URL2 = "http://127.0.0.1:8080/api"; //URL for main DB
export const s3base_URL = "https://skooler.s3.amazonaws.com/"; //base url for amazon s3 bucket
export const schoolID = "SC-24"; //School ID

function App() {
  const [school, setSchool] = useState("");
  const [ui, setUI] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchSchool();
        if (response.status === 200) {
          localStorage.setItem("ui", response.data.school.ui);
          localStorage.setItem("school", JSON.stringify(response.data.school));
          setSchool(response.data.school);
          setUI(JSON.parse(response.data.school.ui));
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      {school.is_active && (
        <div className="App">
          <Routes>
            <Route path="/" element={<Login school={school} ui={ui} />}></Route>
            <Route
              path="/admin"
              element={<Main school={school} ui={ui} />}
            ></Route>
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
