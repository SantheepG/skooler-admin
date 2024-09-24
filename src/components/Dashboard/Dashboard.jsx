import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccessDenied from "../AccessDenied";
import UpdateInfo from "./UpdateInfo";
import { FetchStats } from "../../api/SchoolApi";
import { formatDate } from "../../CommonFuncs";
import { formatNumberWithSpace } from "../../CommonFuncs";
import avatar from "../../assets/default-avatar.png";
import { MdOutlineDeleteSweep } from "react-icons/md";
import AddHolidayView from "./AddHolidayView";


const Dashboard = () => {


  return (
    <React.Fragment>
      <ToastContainer />
        <>
         Dashboard 
        </>
     
    </React.Fragment>
  );
};

export default Dashboard;
