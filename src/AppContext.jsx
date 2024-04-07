import React, { createContext, useContext, useState, useEffect } from "react";
import { FetchSchool } from "./api/SchoolApi";
import { FetchAdmin } from "./api/AuthAPI";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [ui, setUI] = useState({ primary_clr: "", secondary_clr: "" });
  const [admin, setAdmin] = useState("");
  const [roles, setRoles] = useState("");
  const [school, setSchool] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchSchool();
        if (response.status === 200) {
          setSchool(response.data.school);
          setUI(JSON.parse(response.data.school.ui));
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

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const tkn = localStorage.getItem("tkn");
        if (tkn) {
          setLoginStatus(true);
          const response = await FetchAdmin();
          if (response.status === 200) {
            setAdmin(response.data.admin);
            const jsonData = JSON.parse(response.data.admin.roles);
            const adminRoles = Object.keys(jsonData).filter(
              (key) => jsonData[key] === true
            );
            setRoles(adminRoles);
          } else {
            console.log(response);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdmin();
  }, [loginStatus]);

  return (
    <AppContext.Provider
      value={{
        ui,
        setUI,
        school,
        setSchool,
        loginStatus,
        setLoginStatus,
        admin,
        setAdmin,
        roles,
        setRoles,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
