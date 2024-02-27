import React, { useState } from "react";
import hologoLogo from "../../assets/Hologo_logo.png";
import { base_URL2 } from "../../App";
const Nav = ({ school, ui }) => {
  return (
    <React.Fragment>
      <nav
        className={`border-b-2 border-${ui.secondary_clr} flex shadow-md py-2 justify-center md:justify-between md:px-8 lg:justify-between lg:px-36 items-center bg-white`}
      >
        <div className="flex">
          <div className="w-12 h-12">
            <img
              src={`${base_URL2}/super/getlogo/${school.logo_id}`}
              alt="School logo"
              onError={(e) => {
                e.target.src = hologoLogo;
              }}
            />
          </div>

          <span className="m-3 hidden lg:block md:block text-gray-600">
            {school.name}
          </span>
        </div>

        <div className="w-12 w-12 hidden lg:block md:block">
          <img src={hologoLogo} alt="Skooler Logo" className="max-w-100" />
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
