import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Navbar/Sidebar";
import Navbar from "./Navbar/Navbar";
import Dashboard from "./Dashboard/Dashboard";
import ManageUsers from "./ManageUsers/ManageUsers";
import ManageBots from "./ManageBots/ManageBots";
import { useNavigate } from "react-router-dom";
import Drawer from "./Drawer/Drawer";
const Main = () => {
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
      <Dashboard />
    );
  } else if (state.usersClicked) {
    componentToRender = (
      <ManageUsers />
    );
  } else if (state.botsClicked) {
    componentToRender = (
      <ManageBots />
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
