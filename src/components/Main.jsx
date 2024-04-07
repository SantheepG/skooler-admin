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
import { useAppContext } from "../AppContext";

const Main = () => {
  const { roles } = useAppContext();
  const navigate = useNavigate();
  const [toggleSidebar, setToggleBar] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("tkn");
    if (!token) {
      navigate("/");
    }
  }, []);

  //const hasDashboard = yourArray.includes('Dashboard');
  const state = useSelector((state) => state);

  let componentToRender;

  if (state.dashboardClicked) {
    componentToRender = (
      <Dashboard bool={roles.includes("Dashboard") ? true : false} />
    );
  } else if (state.usersClicked) {
    componentToRender = (
      <ManageUsers bool={roles.includes("ManageUsers") ? true : false} />
    );
  } else if (state.adminsClicked) {
    componentToRender = (
      <ManageAdmins bool={roles.includes("ManageAdmins") ? true : false} />
    );
  } else if (state.productsClicked) {
    componentToRender = (
      <ManageProducts bool={roles.includes("ManageProducts") ? true : false} />
    );
  } else if (state.ordersClicked) {
    componentToRender = (
      <ManageOrders bool={roles.includes("ManageOrders") ? true : false} />
    );
  } else if (state.stockClicked) {
    componentToRender = (
      <ManageStock bool={roles.includes("ManageStock") ? true : false} />
    );
  } else if (state.complaintsClicked) {
    componentToRender = (
      <ManageComplaints
        bool={roles.includes("ManageComplaints") ? true : false}
      />
    );
  } else if (state.eventsClicked) {
    componentToRender = (
      <ManageEvents bool={roles.includes("ManageEvents") ? true : false} />
    );
  }

  return (
    <React.Fragment>
      <Navbar toggle={() => setToggleBar(!toggleSidebar)} />
      <Sidebar toggle={toggleSidebar} />
      <div class="p-2 sm:ml-64">
        <div class="p-6 gray-200 rounded-lg dark:border-gray-700 mt-14">
          {componentToRender}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Main;
