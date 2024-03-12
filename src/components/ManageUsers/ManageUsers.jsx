import React, { useState, useEffect } from "react";
import UserRow from "./UserRow";
import UserDetailsView from "./UserDetailsView";
import { Toaster, toast } from "react-hot-toast";
import AccessDenied from "../AccessDenied";
import { ChangeStatus, FetchUsers } from "../../api/UserApi";
const ManageUsers = ({ bool }) => {
  const [fetchedUsers, setFetchedUsers] = useState(null);
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
                {fetchedUsers !== null ? (
                  usersToView !== undefined && usersToView.length !== 0 ? (
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
                  )
                ) : (
                  <tr class="h-16 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td
                      colSpan="number of columns"
                      className="text-center px-12 py-6"
                    >
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-orange-400"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </div>
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
