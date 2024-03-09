import React, { useState, useEffect } from "react";
import UserRow from "./UserRow";
import UserDetailsView from "./UserDetailsView";
import { Toaster, toast } from "react-hot-toast";
import AccessDenied from "../AccessDenied";
import { ChangeStatus, FetchUsers } from "../../api/UserApi";
const ManageUsers = ({ bool }) => {
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [usersToView, setUsersToView] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [viewUserDetails, setViewUserDetails] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (userId) => {
    setOpenDropdown((prevOpenDropdown) =>
      prevOpenDropdown === userId ? null : userId
    );
  };
  const ViewOverlayHandler = (user) => {
    setViewUserDetails(!viewUserDetails);
    setCurrentUser(user);
  };

  const toggleActiveStatus = async (id, isActive) => {
    try {
      const response = await ChangeStatus({ id: id, isActive: isActive });
      if (response.status === 200) {
        setFetchedUsers(response.data.users);
        setUsersToView(response.data.users);

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
        const response = await FetchUsers();
        //setEvents(response.data.events);
        if (response.status === 200) {
          setFetchedUsers(response.data.users);
          setUsersToView(response.data.users);
        }
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const inputValue = event.target.value.toLowerCase();
    if (inputValue === "") {
      setUsersToView(fetchedUsers);
    } else {
      let matchedUsers = fetchedUsers.filter(
        (item) =>
          item.first_name.toLowerCase().includes(inputValue) ||
          item.mobile_no.toLowerCase().includes(inputValue) ||
          item.id === parseInt(inputValue)
      );
      setUsersToView(matchedUsers);
    }
  };

  return (
    <React.Fragment>
      {bool ? (
        <div className="viewContent relative m-5">
          <Toaster className="notifier" />
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg admin-table">
            <div class="flex items-center lg:px-6 justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
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
                  className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for users"
                  onChange={handleSearch}
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
                    #ID
                  </th>
                  <th scope="col" class="px-6 py-3">
                    User
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
                {usersToView !== undefined && usersToView.length !== 0 ? (
                  usersToView.map((user) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <UserRow
                        key={user._id}
                        userData={user}
                        openDropdown={openDropdown}
                        toggleDropdown={() => toggleDropdown(user.id)}
                        toggleActiveStatus={toggleActiveStatus}
                        ViewOverlayHandler={ViewOverlayHandler}
                      />
                    </tr>
                  ))
                ) : (
                  <tr class="h-16 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td colSpan="number of columns" className="text-center">
                      No users here
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {viewUserDetails && (
              <div
                id="viewUserModal"
                tabindex="-1"
                aria-hidden="true"
                className={`fixed top-16 left-0 right-0 bottom-0 z-50 lg:flex lg:items-center lg:justify-center lg:top-0 lg:mx-14 md:mx-36 md:ml-64 p-4 overflow-x-hidden overflow-y-auto h-full`}
              >
                <UserDetailsView
                  ViewOverlayHandler={ViewOverlayHandler}
                  user={currentUser}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <AccessDenied />
      )}
    </React.Fragment>
  );
};

export default ManageUsers;
