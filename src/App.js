import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import Login from "./components/Login/Login";
import { FetchSchool } from "./api/SchoolApi";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./AppContext";

export const imgFormats = ["jpg", "jpeg", "png", "bmp", "wbmp"]; //img formats
export const base_URL = "http://127.0.0.1:8000/api"; //URL for school DB
export const base_URL2 = "http://127.0.0.1:8080/api"; //URL for main DB
export const s3base_URL = "https://skoolers3.s3.amazonaws.com/"; //base url for amazon s3 bucket
export const schoolID = "SC-24"; //School ID

function App() {
  const [school, setSchool] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchSchool();
        if (response.status === 200) {
          setSchool(response.data.school);
        } else if (response.status === 401) {
          console.log("Unauthorized");
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
    <AppProvider>
      <Router>
        {school && school.is_active && (
          <div className="App">
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/admin" element={<Main />}></Route>
            </Routes>
          </div>
        )}
      </Router>
    </AppProvider>
  );
}

export default App;
