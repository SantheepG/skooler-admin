import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { UpdateRoles } from "../../api/AdminApi";

const AdminDetailsView = ({ ViewAdminOverlayHandler, admin, reload }) => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [nonSelectedRoles, setNonSelectedRoles] = useState([]);

  useEffect(() => {
    const parseSelectedRoles = () => {
      if (admin !== undefined) {
        try {
          let jsonData = JSON.parse(admin.roles);
          let adminRoles = Object.keys(jsonData).filter(
            (key) => jsonData[key] === true
          );
          setSelectedRoles(adminRoles);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };

    const parseNonSelectedRoles = () => {
      console.log("Roles:", admin.roles);
      if (admin !== undefined) {
        try {
          let jsonData = JSON.parse(admin.roles);
          let adminRoles = Object.keys(jsonData).filter(
            (key) => jsonData[key] === false
          );
          setNonSelectedRoles(adminRoles);
          console.log(nonSelectedRoles);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };
    if (admin !== undefined) {
      parseNonSelectedRoles();
      parseSelectedRoles();
    }
  }, [admin]);

  const addRole = (newRole) => {
    setSelectedRoles((prevRoles) => [...prevRoles, newRole]);
    setNonSelectedRoles((prevRoles) =>
      prevRoles.filter((role) => role !== newRole)
    );
  };

  const deleteRole = (deleteRole) => {
    setNonSelectedRoles((prevRoles) => [...prevRoles, deleteRole]);
    setSelectedRoles((prevRoles) =>
      prevRoles.filter((role) => role !== deleteRole)
    );
  };

  const updateRoles = async () => {
    try {
      let roles = {
        Dashboard: selectedRoles.includes("Dashboard") ? true : false,
        ManageUsers: selectedRoles.includes("ManageUsers") ? true : false,
        ManageAdmins: selectedRoles.includes("ManageAdmins") ? true : false,
        ManageProducts: selectedRoles.includes("ManageProducts") ? true : false,
        ManageOrders: selectedRoles.includes("ManageOrders") ? true : false,
        ManageStock: selectedRoles.includes("ManageStock") ? true : false,
        ManageEvents: selectedRoles.includes("ManageEvents") ? true : false,
        ManageComplaints: selectedRoles.includes("ManageComplaints")
          ? true
          : false,
      };

      const response = await UpdateRoles(admin.id, JSON.stringify(roles));
      if (response) {
        console.log("success");
        toast.success("Saved", {
          duration: 1200,
          position: "center",
          //icon: "❌",
        });

        const timerId = setTimeout(() => {
          ViewAdminOverlayHandler();
          reload(true);
        }, 1600);

        return () => clearTimeout(timerId);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  return (
    <React.Fragment>
      {admin ? (
        <div class="relative w-full max-w-2xl max-h-full">
          <Toaster className="notifier" />
          <form class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Admin details
                <div className="text-xs text-gray-500">
                  Admin ID : <span>#{admin.id}</span>
                </div>
              </h3>

              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="editUserModal"
                onClick={ViewAdminOverlayHandler}
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">
                  <a href="#">Close modal</a>
                </span>
              </button>
            </div>

            <div class="p-6 space-y-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first-name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    class="shadow-sm bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Bonnie"
                    required=""
                    value={admin.first_name}
                    disabled
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="last-name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Surname
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    class="shadow-sm bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Green"
                    required=""
                    value={admin.last_name}
                    disabled
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="shadow-sm bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@company.com"
                    required=""
                    value={admin.email}
                    disabled
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="phone-number"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone-number"
                    id="phone-number"
                    class="shadow-sm bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="e.g. +(12)3456 789"
                    required=""
                    value={admin.mobile_no}
                    disabled
                  />
                </div>
                <div class="col-span-6 sm:col-span-6 ">
                  <label
                    for="roles"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Added roles
                  </label>
                  <div className="bg-gray-50 border p-4 rounded-lg border-gray-100 text-gray-900 text-sm">
                    {admin ? (
                      selectedRoles.length !== 0 ? (
                        selectedRoles.map((role, index) => (
                          <span
                            id={index}
                            class="inline-flex mb-1 items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
                          >
                            {role}
                            <button
                              //disabled={order.order_type === "delivery"}
                              key={index}
                              type="button"
                              class="inline-flex items-center p-1 ms-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900 dark:hover:bg-red-800 dark:hover:text-red-300"
                              data-dismiss-target="#badge-dismiss-default"
                              aria-label="Remove"
                              onClick={() => deleteRole(role + "")}
                            >
                              <svg
                                class="w-2 h-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                              </svg>
                              <span class="sr-only">Remove badge</span>
                            </button>
                          </span>
                        ))
                      ) : (
                        <div> No roles has been added</div>
                      )
                    ) : null}
                  </div>
                  <div className="bg-gray-50 border p-4 mt-4 rounded-lg border-gray-100 text-gray-900 text-sm">
                    {admin
                      ? nonSelectedRoles.length !== 0
                        ? nonSelectedRoles.map((role, index) => (
                            <span
                              id={index}
                              class="inline-flex mb-1 items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-200 rounded dark:bg-blue-900 dark:text-blue-300"
                            >
                              {role}
                              <button
                                key={index}
                                type="button"
                                class="inline-flex items-center p-1 ms-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300"
                                data-dismiss-target="#badge-dismiss-default"
                                aria-label="Remove"
                                onClick={() => addRole(role + "")}
                              >
                                <svg
                                  class="w-2 h-2"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 14 14"
                                >
                                  <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M1 7h12M7 1v12"
                                  />
                                </svg>

                                <span class="sr-only">Add badge</span>
                              </button>
                            </span>
                          ))
                        : null
                      : null}
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3"></div>
                <div class="col-span-6 sm:col-span-3"></div>
              </div>
            </div>

            <div class="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => updateRoles()}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default AdminDetailsView;
