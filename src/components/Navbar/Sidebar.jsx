import React from "react";
import {
  BiGridAlt,
  BiErrorCircle,
  BiLock,
  BiSolidBarChartAlt2,
} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setClicked } from "../../redux/action";
import { useAppContext } from "../../AppContext";
const Sidebar = ({ toggle }) => {
  const { ui, roles } = useAppContext();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleItemClick = (item) => {
    if (!state[item]) {
      dispatch(setClicked(item, true));
    }
  };

  return (
    <React.Fragment>
      <aside
        id="logo-sidebar"
        class={`${
          toggle ? "" : "-translate-x-full"
        } fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform  bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div class="h-full mt-4 px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul class="space-y-1 font-medium">
            <span class="self-center text-gray-700 mx-16 text-xs font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              Skooler
            </span>
            <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

            <li>
              <a
                className={`flex items-center  transition-all duration-300 ease-in-out cursor-pointer p-2 pt-4 hover:ml-4 pb-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  state.dashboardClicked
                    ? `bg-gray-100 border-l-4 border-${ui.secondary_clr}`
                    : ""
                }`}
                onClick={() => handleItemClick("dashboardClicked")}
              >
                {roles.includes("Dashboard") ? (
                  <svg
                    class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                ) : (
                  <span class="inline-flex items-center justify-center w-5 h-5 font-medium text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <span className="">
                      <BiLock className="text-red-500 text-2xl" />
                    </span>
                  </span>
                )}

                <span class="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                className={`flex cursor-pointer transition-all duration-300 ease-in-out items-center hover:ml-4 p-2 pt-4 pb-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  state.usersClicked
                    ? `bg-gray-100 border-l-4 border-${ui.secondary_clr}`
                    : ""
                }`}
                onClick={() => handleItemClick("usersClicked")}
              >
                {roles.includes("ManageUsers") ? (
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                ) : (
                  <span class="inline-flex items-center justify-center w-5 h-5 font-medium text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <span className="">
                      <BiLock className="text-red-500 text-2xl" />
                    </span>
                  </span>
                )}

                <span class="flex-1 ms-3 whitespace-nowrap">Manage Users</span>
              </a>
            </li>
            <li>
              <a
                className={`flex cursor-pointer transition-all duration-300 ease-in-out hover:ml-4 items-center p-2 pt-4 pb-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  state.adminsClicked
                    ? `bg-gray-100 border-l-4 border-${ui.secondary_clr}`
                    : ""
                }`}
                onClick={() => handleItemClick("adminsClicked")}
              >
                {roles.includes("ManageAdmins") ? (
                  <svg
                    class="w-5 h-5 text-gray-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="7" r="4" />
                    <path d="M12 22a10 10 0 0 1-7.75-3.75c.016-1.606 1.298-3.004 3-3.004h9.5c1.702 0 3 1.398 3 3.004a10 10 0 0 1-7.75 3.75z" />
                  </svg>
                ) : (
                  <span class="inline-flex items-center justify-center w-5 h-5 font-medium text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <span className="">
                      <BiLock className="text-red-500 text-2xl" />
                    </span>
                  </span>
                )}

                <span class="flex-1 ms-3 whitespace-nowrap">Manage Admins</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex transition-all duration-300 ease-in-out items-center hover:ml-4 p-2 pt-4 pb-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  state.productsClicked
                    ? `bg-gray-100 border-l-4 border-${ui.secondary_clr}`
                    : ""
                }`}
                onClick={() => handleItemClick("productsClicked")}
              >
                {roles.includes("ManageProducts") ? (
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                  </svg>
                ) : (
                  <span class="inline-flex items-center justify-center w-5 h-5 font-medium text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <span className="">
                      <BiLock className="text-red-500 text-2xl" />
                    </span>
                  </span>
                )}

                <span class="flex-1 ms-3 whitespace-nowrap">
                  Manage Products
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center transition-all duration-300 ease-in-out hover:ml-4 p-2 pt-4 pb-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  state.ordersClicked
                    ? `bg-gray-100 border-l-4 border-${ui.secondary_clr}`
                    : ""
                }`}
                onClick={() => handleItemClick("ordersClicked")}
              >
                {roles.includes("ManageOrders") ? (
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                  </svg>
                ) : (
                  <span class="inline-flex items-center justify-center w-5 h-5 font-medium text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <span className="">
                      <BiLock className="text-red-500 text-2xl" />
                    </span>
                  </span>
                )}

                <span class="flex-1 ms-3 whitespace-nowrap">Manage Orders</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`transition-all duration-300 ease-in-out flex items-center hover:ml-4 p-2 pt-4 pb-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  state.stockClicked
                    ? `bg-gray-100 border-l-4 border-${ui.secondary_clr}`
                    : ""
                }`}
                onClick={() => handleItemClick("stockClicked")}
              >
                {roles.includes("ManageStock") ? (
                  <span className="">
                    <BiSolidBarChartAlt2 className="text-2xl text-gray-600" />
                  </span>
                ) : (
                  <span class="inline-flex items-center justify-center w-5 h-5 font-medium text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <span className="">
                      <BiLock className="text-red-500 text-2xl" />
                    </span>
                  </span>
                )}

                <span class="flex-1 ms-3 whitespace-nowrap">Manage Stock</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex transition-all duration-300 ease-in-out items-center hover:ml-4 p-2 pt-4 pb-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  state.eventsClicked
                    ? `bg-gray-100 border-l-4 border-${ui.secondary_clr}`
                    : ""
                }`}
                onClick={() => handleItemClick("eventsClicked")}
              >
                {roles.includes("ManageEvents") ? (
                  <span className="">
                    <BiGridAlt className="text-2xl" />
                  </span>
                ) : (
                  <span class="inline-flex items-center justify-center w-5 h-5 font-medium text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <span className="">
                      <BiLock className="text-red-500 text-2xl" />
                    </span>
                  </span>
                )}

                <span class="flex-1 ms-3 whitespace-nowrap">Manage Events</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center transition-all duration-300 ease-in-out hover:ml-4 p-2 pt-4 pb-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  state.complaintsClicked
                    ? `bg-gray-100 border-l-4 border-${ui.secondary_clr}`
                    : ""
                }`}
                onClick={() => handleItemClick("complaintsClicked")}
              >
                {roles.includes("ManageComplaints") ? (
                  <span className="">
                    <BiErrorCircle className="text-2xl" />
                  </span>
                ) : (
                  <span class="inline-flex items-center justify-center w-5 h-5 font-medium text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <span className="">
                      <BiLock className="text-red-500 text-2xl" />
                    </span>
                  </span>
                )}

                <span class="flex-1 ms-3 whitespace-nowrap">
                  Manage complaints
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </React.Fragment>
  );
};

export default Sidebar;
