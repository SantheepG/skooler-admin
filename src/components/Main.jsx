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

const Main = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    student_id: "",
    mobile_no: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("admin"));
    if (storedUserData) {
      setAdminData(storedUserData);
    }
  }, []);

  const state = useSelector((state) => state);

  let componentToRender;

  if (state.dashboardClicked) {
    componentToRender = <Dashboard />;
  } else if (state.usersClicked) {
    componentToRender = <ManageUsers />;
  } else if (state.adminsClicked) {
    componentToRender = <ManageAdmins />;
  } else if (state.productsClicked) {
    componentToRender = <ManageProducts />;
  } else if (state.ordersClicked) {
    componentToRender = <ManageOrders />;
  } else if (state.stockClicked) {
    componentToRender = <ManageStock />;
  } else if (state.complaintsClicked) {
    componentToRender = <ManageComplaints />;
  } else if (state.eventsClicked) {
    componentToRender = <ManageEvents />;
  }

  return (
    <React.Fragment>
      <div class="s-layout">
        <Sidebar />
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
