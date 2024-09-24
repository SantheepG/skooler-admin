import React from "react";
import { BsRobot } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setClicked } from "../../redux/action";
import { useAppContext } from "../../AppContext";
const Sidebar = ({ toggle }) => {
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
        } fixed top-0 left-0 z-40 w-64 h-screen shadow-lg pt-14 transition-transform  bg-white border-r border-orange-300 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div class="h-full mt-4 pl-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul class="space-y-1 font-medium">
            <span class="self-center text-gray-700 mx-16 text-xs font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
            
            </span>
            {/* <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr> */}

            {/* <li>
              <a
                className={`flex items-center  transition-all duration-300 ease-in-out cursor-pointer p-2 pt-4 hover:ml-4 pb-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  state.dashboardClicked
                    ? `bg-gray-100 border-l-4 border-orange-300`
                    : ""
                }`}
                onClick={() => handleItemClick("dashboardClicked")}
              >
                
                  <svg
                    class={`${state.dashboardClicked?"text-orange-400":"text-gray-500"} w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-white`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                

                <span class="ms-3">Dashboard</span>
                <span class="flex w-1 h-1 ml-16 bg-purple-500 rounded-full shadow-[0_0_20px_10px_rgba(128,90,213,1)]"></span>

                {state.dashboardClicked &&(<span class="flex w-1 h-1 ml-16 animate-zoom-in bg-orange-500 rounded-full shadow-[0_0_10px_2px_rgba(255,165,0,1)]"></span>)}


              </a>
            </li> */}
            <li>
              <a
                className={`flex cursor-pointer transition-all duration-300 ease-in-out hover:ml-4 items-center p-2 pt-4 pb-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  state.botsClicked
                    ? `bg-gray-50 border-l-4 border-orange-300`
                    : ""
                }`}
                onClick={() => handleItemClick("botsClicked")}
              >
                
                  <span className="">
                    <BsRobot className={`${state.botsClicked?"text-orange-400":"text-gray-500"} w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-white text-2xl`} />
                  </span>
                

                <span class="flex-1 ms-3 whitespace-nowrap">Manage Bots</span>
              </a>
            </li>
            <li>
              <a
                className={`flex cursor-pointer transition-all duration-300 ease-in-out items-center hover:ml-4 p-2 pt-4 pb-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  state.usersClicked
                    ? `bg-gray-50 border-l-4 border-orange-300`
                    : ""
                }`}
                onClick={() => handleItemClick("usersClicked")}
              >
             
                  <svg
                    class={`${state.usersClicked?"text-orange-400":"text-gray-500"} w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-white`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
               

                <span class="flex-1 ms-3 whitespace-nowrap">Manage Users</span>
              </a>
            </li>
            
            
          </ul>
          <hr class="w-64 h-0.5 ml-1 mt-4  bg-gray-200 border-0 rounded  dark:bg-gray-700"></hr>
        </div>
      </aside>
    </React.Fragment>
  );
};

export default Sidebar;
