import React, { useEffect, useState } from "react";
import "./Main.css";
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
const Main = () => {
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
        <Dashboard bool={true} roles={roles} admin={adminData} />
      );
    } else {
      componentToRender = <Dashboard bool={false} />;
    }
  } else if (state.usersClicked) {
    if (roles.includes("ManageUsers")) {
      componentToRender = <ManageUsers bool={true} />;
    } else {
      componentToRender = <ManageUsers bool={false} />;
    }
  } else if (state.adminsClicked) {
    if (roles.includes("ManageAdmins")) {
      componentToRender = <ManageAdmins bool={true} />;
    } else {
      componentToRender = <ManageAdmins bool={false} />;
    }
  } else if (state.productsClicked) {
    if (roles.includes("ManageProducts")) {
      componentToRender = <ManageProducts bool={true} />;
    } else {
      componentToRender = <ManageProducts bool={false} />;
    }
  } else if (state.ordersClicked) {
    if (roles.includes("ManageOrders")) {
      componentToRender = <ManageOrders bool={true} />;
    } else {
      componentToRender = <ManageOrders bool={false} />;
    }
  } else if (state.stockClicked) {
    if (roles.includes("ManageStock")) {
      componentToRender = <ManageStock bool={true} />;
    } else {
      componentToRender = <ManageStock bool={false} />;
    }
  } else if (state.complaintsClicked) {
    if (roles.includes("ManageComplaints")) {
      componentToRender = <ManageComplaints bool={true} />;
    } else {
      componentToRender = <ManageComplaints bool={false} />;
    }
  } else if (state.eventsClicked) {
    if (roles.includes("ManageEvents")) {
      componentToRender = <ManageEvents bool={true} />;
    } else {
      componentToRender = <ManageEvents bool={false} />;
    }
  }

  return (
    <React.Fragment>
      <Navbar toggle={() => setToggleBar(!toggleSidebar)} />
      <Sidebar roles={roles} toggle={toggleSidebar} />
      <div class="p-2 sm:ml-64">
        <div class="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          {componentToRender}
        </div>
      </div>
      <div></div>
    </React.Fragment>
  );
};

export default Main;
