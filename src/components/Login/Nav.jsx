import React, { useEffect, useState } from "react";
import hologoLogo from "../../assets/Hologo_logo.png";
import { base_URL2 } from "../../App";
const Nav = () => {
  const [logo, setLogo] = useState("");
  const [school, setSchool] = useState("");
  const [ui, setUI] = useState("");

  useEffect(() => {
    const storedUIData = JSON.parse(localStorage.getItem("ui"));
    const storedSchoolData = JSON.parse(localStorage.getItem("school"));
    if (storedUIData) {
      setUI(storedUIData);
    }
    if (storedSchoolData) {
      setSchool(storedSchoolData);
    }
  }, []);
  return (
    <React.Fragment>
      <nav className="flex shadow-md py-2 justify-between px-32 items-center bg-white ">
        <div className="flex">
          <div className="w-12 h-12">
            <img
              src={`${base_URL2}/super/getlogo/${school.logo_id}`}
              alt="School logo"
              className="max-w-100"
            />
          </div>

          <span className="m-3 text-gray-600">{school.name}</span>
        </div>

        <div className="w-12 w-12 sm:hidden md:block lg:">
          <img src={hologoLogo} alt="Skooler Logo" className="max-w-100" />
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
