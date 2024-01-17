import React, { useState, useEffect } from "react";
import defaultImg from "../../assets/default-avatar.png";
import axios from "axios";
import UserRow from "./UserRow";
import UserDetailsView from "./UserDetailsView";
import { Toaster, toast } from "react-hot-toast";
import AccessDenied from "../AccessDenied";
const ManageUsers = ({ bool }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [viewUserDetails, setViewUserDetails] = useState(false);
  const [viewStatusChange, setViewStatusChange] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const ViewOverlayHandler = (user) => {
    setViewUserDetails(!viewUserDetails);
    setCurrentUser(user);
  };

  const toggleActiveStatus = async (id, isActive) => {
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/changeuserstatus",
        { id: id, isActive: isActive },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setUsers(response.data.users);
        console.log("Status changed");
        toast.success("Status changed", {
          duration: 1200,
          position: "top-center",
          //icon: "❌",
        });
      } else {
        console.error("Something went wrong");
        toast.error("Something went wrong", {
          duration: 1200,
          position: "top-center",
          //icon: "❌",
        });
      }
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  useEffect(() => {
    //
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/fetchusers"
        );
        //setEvents(response.data.events);
        setUsers(response.data.users);
        console.log(response.data.users);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <React.Fragment>
      {bool ? (
        <div className="relative m-5">
          <Toaster className="notifier" />
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg admin-table">
            <div class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
              <label for="table-search" class="sr-only">
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for users"
                />
              </div>
            </div>
            <table
              className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ${
                viewUserDetails ? "opacity-30" : ""
              }`}
            >
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Mobile number
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length !== 0 ? (
                  users.map((user) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <UserRow
                        key={user._id}
                        userData={user}
                        toggleActiveStatus={toggleActiveStatus}
                        ViewOverlayHandler={ViewOverlayHandler}
                      />
                    </tr>
                  ))
                ) : (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td colSpan="number of columns" className="text-center">
                      No users here
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div
              id="editUserModal"
              tabindex="-1"
              aria-hidden="true"
              className={`flex ml-10 fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
                viewUserDetails ? "" : "hidden"
              }`}
            >
              <UserDetailsView
                ViewOverlayHandler={ViewOverlayHandler}
                user={currentUser}
              />
            </div>
          </div>
        </div>
      ) : (
        <AccessDenied />
      )}
    </React.Fragment>
  );
};

export default ManageUsers;
