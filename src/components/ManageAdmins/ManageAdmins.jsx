import React, { useState, useEffect } from "react";
import "./ManageAdmins.css";
import axios from "axios";
import defaultImg from "../../assets/default-avatar.png";
import AdminRow from "./AdminRow";
import { Toaster, toast } from "react-hot-toast";
import AdminDetailsView from "./AdminDetailsView";
import AccessDenied from "../AccessDenied";

const ManageAdmins = ({ bool }) => {
  const [adminsData, setAdminsData] = useState([]);
  const [currentRoles, setCurrentRoles] = useState([]);
  const [currentAdmin, setCurrentAdmin] = useState([]);
  const [viewAdminDetails, setViewAdminDetails] = useState(false);
  const [viewStatusChange, setViewStatusChange] = useState(false);
  const [viewEditDropdown, setViewEditDropdown] = useState(false);
  const [viewAddAdmin, setviewAddAdmin] = useState(false);
  const [viewRolesDropdown, setViewRolesDropdown] = useState(false);
  const [reloadComponent, setReloadComponent] = useState(false);
  const [addAdminData, setaddAdminData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",

    roles: {
      Dashboard: false,
      ManageUsers: false,
      ManageAdmins: false,
      ManageProducts: false,
      ManageOrders: false,
      ManageStock: false,
      ManageEvents: false,
      ManageComplaints: false,
    },
    password: "",
    profile_pic: null,
  });

  const ViewAdminOverlayHandler = (admin, selectedRoles) => {
    setViewAdminDetails(!viewAdminDetails);
    setCurrentAdmin(admin);
    setCurrentRoles(selectedRoles);
  };

  const toggleAdminStatus = async (id, isActive) => {
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/changeadminstatus",
        { id: id, isActive: isActive },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setAdminsData(response.data.admins);
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
    const fetchAdmins = async () => {
      if (bool) {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/fetchadmins"
          );
          //setEvents(response.data.events);
          setAdminsData(response.data.admins);
          console.log(response.data.admins);
        } catch (error) {
          console.error("Fetch error: ", error);
        }
      }
    };
    fetchAdmins();
  }, [reloadComponent]);

  const resetAddAdminData = () => {
    setaddAdminData({
      first_name: "",
      last_name: "",
      email: "",
      mobile_no: "",
      password: "",
      roles: {
        Dashboard: false,
        ManageUsers: false,
        ManageAdmins: false,
        ManageProducts: false,
        ManageOrders: false,
        ManageStock: false,
        ManageComplaints: false,
      },
      profile_pic: null,
    });
  };

  const ViewUserHandler = () => {
    setViewAdminDetails(!viewAdminDetails);
  };

  const ViewAddAdminHandler = () => {
    setviewAddAdmin(!viewAddAdmin);
  };

  const viewRolesDropdownHandler = () => {
    setViewRolesDropdown(!viewRolesDropdown);
  };

  const addAdmin = async () => {
    try {
      if (
        addAdminData.last_name !== "" &&
        addAdminData.first_name !== "" &&
        addAdminData.email !== "" &&
        addAdminData.mobile_no !== "" &&
        addAdminData.password !== "" &&
        addAdminData.roles !== ""
      ) {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/adminsignup",
          {
            first_name: addAdminData.first_name,
            last_name: addAdminData.last_name,
            email: addAdminData.email,
            mobile_no: addAdminData.mobile_no,
            password: addAdminData.password,
            roles: JSON.stringify(addAdminData.roles),
            profile_pic: null,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          console.log("Created success");
          toast.success("Admin added", {
            duration: 1200,
            position: "top-center",
            //icon: "❌",
          });
          setviewAddAdmin(false);
          setReloadComponent(true);
          resetAddAdminData();
        }
      } else {
        console.error("Required fields are empty");
        toast.error("Required fields are empty", {
          duration: 1200,
          position: "top-center",
          //icon: "❌",
        });
      }
    } catch (error) {
      console.error(error.message);
      console.log(addAdminData);
      toast.error("Invalid mobile number or password", {
        duration: 1500,
        position: "top-center",
        //icon: "❌",
      });
    }
  };
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
                  placeholder="Search for admins"
                />
              </div>
              <button
                type="button"
                id="createProductButton"
                data-modal-toggle="createProductModal"
                class="flex items-center justify-center text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                onClick={ViewAddAdminHandler}
              >
                Add
              </button>
            </div>
            <table
              className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ${
                viewAdminDetails || viewAddAdmin ? "opacity-30" : ""
              }`}
            >
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-1 py-3">
                    Contact number
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
                {adminsData.length !== 0 ? (
                  adminsData.map((admin) => (
                    <tr
                      key={admin.id}
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <AdminRow
                        adminData={admin}
                        toggleAdminStatus={toggleAdminStatus}
                        ViewAdminOverlayHandler={ViewAdminOverlayHandler}
                      />
                    </tr>
                  ))
                ) : (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td colSpan="number of columns" className="text-center">
                      No admins here
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
                viewAdminDetails ? "" : "hidden"
              }`}
            >
              <AdminDetailsView
                ViewAdminOverlayHandler={() => ViewAdminOverlayHandler()}
                admin={currentAdmin}
              />
            </div>
            <div
              id="addAdminModal"
              tabindex="-1"
              aria-hidden="true"
              className={`flex ml-10 fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
                viewAddAdmin ? "" : "hidden"
              }`}
            >
              <div class="relative w-full max-w-2xl max-h-full">
                <form class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                      Add admin
                    </h3>
                    <button
                      type="button"
                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="addAdminModal"
                      onClick={() => {
                        ViewAddAdminHandler();
                        resetAddAdminData();
                        setViewRolesDropdown();
                      }}
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
                        <a href="">Close modal</a>
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
                          First Name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Bonnie"
                          required=""
                          value={addAdminData.first_name}
                          onChange={(e) =>
                            setaddAdminData({
                              ...addAdminData,
                              first_name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="last-name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Green"
                          required=""
                          value={addAdminData.last_name}
                          onChange={(e) =>
                            setaddAdminData({
                              ...addAdminData,
                              last_name: e.target.value,
                            })
                          }
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
                          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="example@company.com"
                          required=""
                          value={addAdminData.email}
                          onChange={(e) =>
                            setaddAdminData({
                              ...addAdminData,
                              email: e.target.value,
                            })
                          }
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
                          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder=" +12 3456 789"
                          required=""
                          value={addAdminData.mobile_no}
                          onChange={(e) =>
                            setaddAdminData({
                              ...addAdminData,
                              mobile_no: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="password"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="••••••••"
                          required=""
                          value={addAdminData.password}
                          onChange={(e) =>
                            setaddAdminData({
                              ...addAdminData,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="password"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Confirm password
                        </label>
                        <input
                          type="password"
                          name="confirm-password"
                          id="confirm-password"
                          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="••••••••"
                          required=""
                        />
                      </div>
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="department"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Roles
                        </label>

                        <button
                          id="dropdownSearchButton"
                          data-dropdown-toggle="dropdownSearch"
                          data-dropdown-placement="bottom"
                          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          type="button"
                          onClick={viewRolesDropdownHandler}
                        >
                          Select admin roles{" "}
                          <svg
                            class="w-2.5 h-2.5 ms-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                        </button>

                        <div
                          id="dropdownSearch"
                          className={`absolute z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700 ${
                            viewRolesDropdown ? "" : "hidden"
                          }`}
                        >
                          <ul
                            class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownSearchButton"
                          >
                            <li class="mt-2">
                              <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                <input
                                  id="checkbox-item-11"
                                  type="checkbox"
                                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                  onChange={(e) => {
                                    setaddAdminData({
                                      ...addAdminData,
                                      roles: {
                                        ...addAdminData.roles,
                                        Dashboard: e.target.checked,
                                      },
                                    });
                                  }}
                                />
                                <label
                                  for="checkbox-item-11"
                                  class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                >
                                  Dashboard
                                </label>
                              </div>
                            </li>
                            <li class="">
                              <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                <input
                                  id="checkbox-item-12"
                                  type="checkbox"
                                  onChange={(e) => {
                                    setaddAdminData({
                                      ...addAdminData,
                                      roles: {
                                        ...addAdminData.roles,
                                        ManageUsers: e.target.checked,
                                      },
                                    });
                                  }}
                                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                  for="checkbox-item-12"
                                  class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                >
                                  Manage Users
                                </label>
                              </div>
                            </li>
                            <li>
                              <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                <input
                                  id="checkbox-item-13"
                                  type="checkbox"
                                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                  onChange={(e) => {
                                    setaddAdminData({
                                      ...addAdminData,
                                      roles: {
                                        ...addAdminData.roles,
                                        ManageAdmins: e.target.checked,
                                      },
                                    });
                                  }}
                                />
                                <label
                                  for="checkbox-item-13"
                                  class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                >
                                  Manage Admins
                                </label>
                              </div>
                            </li>
                            <li>
                              <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                <input
                                  id="checkbox-item-14"
                                  type="checkbox"
                                  value=""
                                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                  onChange={(e) => {
                                    setaddAdminData({
                                      ...addAdminData,
                                      roles: {
                                        ...addAdminData.roles,
                                        ManageProducts: e.target.checked,
                                      },
                                    });
                                  }}
                                />
                                <label
                                  for="checkbox-item-14"
                                  class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                >
                                  Manage Products
                                </label>
                              </div>
                            </li>
                            <li>
                              <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                <input
                                  id="checkbox-item-15"
                                  type="checkbox"
                                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                  onChange={(e) => {
                                    setaddAdminData({
                                      ...addAdminData,
                                      roles: {
                                        ...addAdminData.roles.ManageOrders,
                                        ManageOrders: e.target.checked,
                                      },
                                    });
                                  }}
                                />
                                <label
                                  for="checkbox-item-15"
                                  class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                >
                                  Manage Orders
                                </label>
                              </div>
                            </li>
                            <li>
                              <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                <input
                                  id="checkbox-item-16"
                                  type="checkbox"
                                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                  onChange={(e) => {
                                    setaddAdminData({
                                      ...addAdminData,
                                      roles: {
                                        ...addAdminData.roles,
                                        ManageStock: e.target.checked,
                                      },
                                    });
                                  }}
                                />
                                <label
                                  for="checkbox-item-16"
                                  class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                >
                                  Manage Stock
                                </label>
                              </div>
                            </li>
                            <li>
                              <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                <input
                                  id="checkbox-item-17"
                                  type="checkbox"
                                  value=""
                                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                  onChange={(e) => {
                                    setaddAdminData({
                                      ...addAdminData,
                                      roles: {
                                        ...addAdminData.roles,
                                        ManageEvents: e.target.checked,
                                      },
                                    });
                                  }}
                                />
                                <label
                                  for="checkbox-item-17"
                                  class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                >
                                  Manage Events
                                </label>
                              </div>
                            </li>
                            <li>
                              <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                <input
                                  id="checkbox-item-18"
                                  type="checkbox"
                                  value=""
                                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                  onChange={(e) => {
                                    setaddAdminData({
                                      ...addAdminData,
                                      roles: {
                                        ...addAdminData.roles,
                                        ManageComplaints: e.target.checked,
                                      },
                                    });
                                  }}
                                />
                                <label
                                  for="checkbox-item-18"
                                  class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                >
                                  Manage Complaints
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={addAdmin}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AccessDenied />
      )}
    </React.Fragment>
  );
};

export default ManageAdmins;
