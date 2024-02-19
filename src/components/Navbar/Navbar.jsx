import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { base_URL2 } from "../../App";
import { Logout } from "../../api/AuthAPI";
const Navbar = ({ toggle }) => {
  const [school, setSchool] = useState("");
  const [ui, setUI] = useState("");
  const dispatch = useDispatch();
  const [userClicked, setUserClicked] = useState(false);
  const [notificationsClicked, setNotificationsClicked] = useState(false);
  const [mobNavClicked, setMobNavClicked] = useState(false);
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setEmailAdmin] = useState("");
  const [adminData, setAdminData] = useState({
    name: "",
    student_id: "",
    mobile_no: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedUIData = JSON.parse(localStorage.getItem("ui"));
    const storedSchoolData = JSON.parse(localStorage.getItem("school"));
    if (storedUIData) {
      setUI(storedUIData);
    }
    if (storedSchoolData) {
      setSchool(storedSchoolData);
    }
    const storedAdminData = JSON.parse(localStorage.getItem("admin"));
    if (storedAdminData) {
      setAdminData(storedAdminData);
      setAdminName(
        `${storedAdminData.first_name} ${storedAdminData.last_name}`
      );
      setEmailAdmin(storedAdminData.email);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await Logout();
      if (response.status === 200) {
        console.log("logged out");
        localStorage.clear();
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <React.Fragment>
      <nav class="fixed shadow-md top-0 z-50 w-full bg-white">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => toggle()}
              >
                <span class="sr-only">Open sidebar</span>
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <div className="ml-10 w-12 h-12">
                <img
                  src={`${base_URL2}/super/getlogo/${school.logo_id}`}
                  alt="School logo"
                  className="max-w-100"
                />
              </div>
              <span className="m-3 text-gray-600">{school.name}</span>
            </div>
            <div class="flex items-center">
              <div class="flex items-center -ms-16">
                <div>
                  <button
                    type="button"
                    class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                    onClick={() => {
                      setUserClicked(!userClicked);
                      setNotificationsClicked(false);
                    }}
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="w-8 h-8 rounded-full"
                      src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className={`right-0 z-10 mt-40 mr-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                    userClicked ? "absolute" : "hidden"
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                >
                  <div class="py-3 px-4">
                    <span class="block text-sm font-semibold text-gray-900 dark:text-white">
                      {adminName}
                    </span>
                    <span class="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {adminEmail}
                    </span>
                  </div>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-2"
                    onClick={handleLogout}
                  >
                    Log out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
