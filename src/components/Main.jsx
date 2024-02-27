import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import Sidebar from "./Navbar/Sidebar";
import Navbar from "./Navbar/Navbar";
import Dashboard from "./Dashboard/Dashboard";
import ManageAdmins from "./ManageAdmins/ManageAdmins";
import ManageUsers from "./ManageUsers/ManageUsers";
import ManageProducts from "./ManageProducts/ManageProducts";
import ManageOrders from "./ManageOrders/ManageOrders";
import ManageStock from "./ManageStock/ManageStock";
import ManageComplaints from "./ManageComplaints/ManageComplaints";
import ManageEvents from "./ManageEvents/ManageEvents";
import { useNavigate } from "react-router-dom";

const Main = ({ school, ui }) => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState([]);
  const [roles, setRoles] = useState("");
  const [toggleSidebar, setToggleBar] = useState(false);
  useEffect(() => {
    const storedAdminData = JSON.parse(localStorage.getItem("admin"));
    if (storedAdminData) {
      setAdminData(storedAdminData);
      const jsonData = JSON.parse(storedAdminData.roles);
      const adminRoles = Object.keys(jsonData).filter(
        (key) => jsonData[key] === true
      );
      setRoles(adminRoles);
    } else {
      navigate("/");
    }
  }, []);

  console.log(roles);
  //const hasDashboard = yourArray.includes('Dashboard');
  const state = useSelector((state) => state);

  let componentToRender;

  if (state.dashboardClicked) {
    if (roles.includes("Dashboard")) {
      componentToRender = (
        <Dashboard
          bool={true}
          roles={roles}
          admin={adminData}
          ui={ui}
          school={school}
        />
      );
    } else {
      componentToRender = <Dashboard bool={false} ui={ui} school={school} />;
    }
  } else if (state.usersClicked) {
    if (roles.includes("ManageUsers")) {
      componentToRender = <ManageUsers bool={true} ui={ui} school={school} />;
    } else {
      componentToRender = <ManageUsers bool={false} ui={ui} school={school} />;
    }
  } else if (state.adminsClicked) {
    if (roles.includes("ManageAdmins")) {
      componentToRender = (
        <ManageAdmins
          adminData={adminData}
          bool={true}
          ui={ui}
          school={school}
        />
      );
    } else {
      componentToRender = <ManageAdmins bool={false} ui={ui} school={school} />;
    }
  } else if (state.productsClicked) {
    if (roles.includes("ManageProducts")) {
      componentToRender = (
        <ManageProducts bool={true} ui={ui} school={school} />
      );
    } else {
      componentToRender = (
        <ManageProducts bool={false} ui={ui} school={school} />
      );
    }
  } else if (state.ordersClicked) {
    if (roles.includes("ManageOrders")) {
      componentToRender = <ManageOrders bool={true} ui={ui} school={school} />;
    } else {
      componentToRender = <ManageOrders bool={false} />;
    }
  } else if (state.stockClicked) {
    if (roles.includes("ManageStock")) {
      componentToRender = <ManageStock bool={true} ui={ui} school={school} />;
    } else {
      componentToRender = <ManageStock bool={false} ui={ui} school={school} />;
    }
  } else if (state.complaintsClicked) {
    if (roles.includes("ManageComplaints")) {
      componentToRender = (
        <ManageComplaints bool={true} ui={ui} school={school} />
      );
    } else {
      componentToRender = (
        <ManageComplaints bool={false} ui={ui} school={school} />
      );
    }
  } else if (state.eventsClicked) {
    if (roles.includes("ManageEvents")) {
      componentToRender = <ManageEvents bool={true} ui={ui} school={school} />;
    } else {
      componentToRender = <ManageEvents bool={false} ui={ui} school={school} />;
    }
  }

  return (
    <React.Fragment>
      <Navbar
        ui={ui}
        school={school}
        toggle={() => setToggleBar(!toggleSidebar)}
      />
      <Sidebar roles={roles} toggle={toggleSidebar} ui={ui} />
      <div class="p-2 sm:ml-64">
        <div class="p-6 gray-200 rounded-lg dark:border-gray-700 mt-14">
          {componentToRender}
        </div>
      </div>
      <div></div>
    </React.Fragment>
  );
};

export default Main;
