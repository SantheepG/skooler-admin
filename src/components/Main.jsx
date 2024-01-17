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
      componentToRender = <Dashboard bool={true} />;
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
      <div class="s-layout">
        <Sidebar roles={roles} />
        <main class="s-layout__content">
          <div>
            <Navbar />
          </div>
          <div>{componentToRender}</div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Main;
