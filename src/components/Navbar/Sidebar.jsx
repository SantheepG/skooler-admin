import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { BsBlockquoteLeft } from "react-icons/bs";
import {
  BiGridAlt,
  BiSolidUser,
  BiNotepad,
  BiCalendarCheck,
  BiErrorCircle,
  BiMessageSquareAdd,
  BiWrench,
  BiLogOut,
  BiLock,
  BiUserCheck,
  BiSolidBarChartAlt2,
} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setClicked } from "../../redux/action";

const Sidebar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [adminData, setAdminData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleItemClick = (item) => {
    if (!state[item]) {
      dispatch(setClicked(item, true));
    }
  };

  return (
    <React.Fragment>
      <div class="s-layout__sidebar">
        <a class="s-sidebar__trigger" href="#0">
          <i>
            <BsBlockquoteLeft class="sidebar-icon" />
          </i>
        </a>

        <nav class="s-sidebar__nav">
          <ul>
            <li>
              <a
                className={`s-sidebar__nav-link ${
                  state.dashboardClicked ? "active" : ""
                }`}
                onClick={() => handleItemClick("dashboardClicked")}
              >
                <span className="sidebar-icons">
                  <BiGridAlt />
                </span>
                <span>
                  <em>Dashboard</em>
                </span>
              </a>
            </li>
            <li>
              <a
                className={`s-sidebar__nav-link ${
                  state.usersClicked ? "active" : ""
                }`}
                onClick={() => handleItemClick("usersClicked")}
              >
                <span className="sidebar-icons">
                  <BiSolidUser />
                </span>
                <span>
                  <em>Manage users</em>
                </span>
              </a>
            </li>
            <li>
              <a
                className={`s-sidebar__nav-link ${
                  state.adminsClicked ? "active" : ""
                }`}
                onClick={() => handleItemClick("adminsClicked")}
              >
                <span className="sidebar-icons">
                  <BiUserCheck />
                </span>
                <span>
                  <em>Manage admins</em>
                </span>
              </a>
            </li>
            <li>
              <a
                className={`s-sidebar__nav-link ${
                  state.productsClicked ? "active" : ""
                }`}
                onClick={() => handleItemClick("productsClicked")}
              >
                <span className="sidebar-icons">
                  <BiMessageSquareAdd />
                </span>
                <span>
                  <em>Manage products</em>
                </span>
              </a>
            </li>
            <li>
              <a
                className={`s-sidebar__nav-link ${
                  state.ordersClicked ? "active" : ""
                }`}
                onClick={() => handleItemClick("ordersClicked")}
              >
                <span className="sidebar-icons">
                  <BiNotepad />
                </span>
                <span>
                  <em>Manage orders</em>
                </span>
              </a>
            </li>
            <li>
              <a
                className={`s-sidebar__nav-link ${
                  state.stockClicked ? "active" : ""
                }`}
                onClick={() => handleItemClick("stockClicked")}
              >
                <span className="sidebar-icons">
                  <BiSolidBarChartAlt2 />
                </span>
                <span>
                  <em>Mange stock</em>
                </span>
              </a>
            </li>
            <li>
              <a
                className={`s-sidebar__nav-link ${
                  state.eventsClicked ? "active" : ""
                }`}
                onClick={() => handleItemClick("eventsClicked")}
              >
                <span className="sidebar-icons">
                  <BiGridAlt />
                </span>
                <span>
                  <em>Manage Events</em>
                </span>
              </a>
            </li>
            <li>
              <a
                className={`s-sidebar__nav-link ${
                  state.complaintsClicked ? "active" : ""
                }`}
                onClick={() => handleItemClick("complaintsClicked")}
              >
                <span className="sidebar-icons">
                  <BiErrorCircle />
                </span>
                <span>
                  <em>Manage complaints</em>
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
