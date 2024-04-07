import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AddAdmin } from "../../api/AdminApi";
import { adminDetailsSchema } from "../../validations";
import { useAppContext } from "../../AppContext";
const AddAdminView = ({ closeModal, reload }) => {
  const { school } = useAppContext();
  const [viewRolesDropdown, setViewRolesDropdown] = useState(false);
  const [errorAlert, setErrorAlert] = useState({});
  //Admin data
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
    confirmPassword: "",
    profile_pic: null,
  });
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const resetData = async () => {
      setaddAdminData({
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
        confirmPassword: "",
        profile_pic: null,
      });
    };
    resetData();
  }, [closeModal]);

  useEffect(() => {
    let newNumber;
    if (phone && phone.length > 1 && phone[0] === "0") {
      newNumber = school.country_code + phone.substring(1);
    } else if (phone && phone.length > 1 && phone[0] === "+") {
      newNumber = phone;
    } else {
      newNumber = school.country_code + phone;
    }
    setaddAdminData({ ...addAdminData, mobile_no: newNumber });
    console.log(addAdminData);
  }, [phone]);

  const addAdmin = async () => {
    try {
      await adminDetailsSchema.validate(
        {
          first_name: addAdminData.first_name,
          last_name: addAdminData.last_name,
          mobile_no: phone,
          email: addAdminData.email,
          password: addAdminData.password,
        },
        { abortEarly: false }
      );
      if (addAdminData.password === addAdminData.confirmPassword) {
        let data = {
          first_name: addAdminData.first_name,
          last_name: addAdminData.last_name,
          email: addAdminData.email,
          mobile_no: addAdminData.mobile_no,
          password: addAdminData.password,
          roles: JSON.stringify(addAdminData.roles),
          profile_pic: null,
          is_active: true,
        };
        const response = await AddAdmin(data);

        if (response.status === 201) {
          toast.success("Admin added", {
            duration: 1200,
            position: "center",
            //icon: "❌",
          });
          reload();
          setTimeout(() => {
            closeModal();
          }, 1500);
        }
      } else {
        toast.error("Passwords didn't match. Please check", {
          duration: 1200,
          position: "center",
          //icon: "❌",
        });
      }
    } catch (error) {
      console.error(error.message);
      if (error.name === "ValidationError") {
        error.inner.forEach((error) => {
          setErrorAlert((prevState) => ({
            ...prevState,
            [error.path]: error.message,
          }));
        });

        setTimeout(() => {
          setErrorAlert({});
        }, 3000);
      } else {
        toast.error("Email or mobile number is already registered", {
          duration: 1500,
          position: "center",
          //icon: "❌",
        });
      }
    }
  };

  return (
    <React.Fragment>
      <div class="relative w-full max-w-2xl max-h-full">
        <Toaster className="notifier" />
        <form class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Add admin
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="addAdminModal"
              onClick={closeModal}
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
                  class={`${
                    errorAlert.hasOwnProperty("first_name") && "border-red-500"
                  } shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Bonnie"
                  required=""
                  onChange={(e) =>
                    setaddAdminData({
                      ...addAdminData,
                      first_name: e.target.value,
                    })
                  }
                />
                <span className="absolute animate-view-content text-xs text-red-500 mt-1">
                  {errorAlert && errorAlert.hasOwnProperty("first_name") && (
                    <span className="animate-view-content">
                      {errorAlert["first_name"]}
                    </span>
                  )}
                </span>
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
                  class={`${
                    errorAlert.hasOwnProperty("last_name") && "border-red-500"
                  } shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Green"
                  required=""
                  onChange={(e) =>
                    setaddAdminData({
                      ...addAdminData,
                      last_name: e.target.value,
                    })
                  }
                />
                <span className="absolute animate-view-content text-xs text-red-500 mt-1">
                  {errorAlert && errorAlert.hasOwnProperty("last_name") && (
                    <span className="animate-view-content">
                      {errorAlert["last_name"]}
                    </span>
                  )}
                </span>
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
                  class={`${
                    errorAlert.hasOwnProperty("email") && "border-red-500"
                  } shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
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
                <span className="absolute animate-view-content text-xs text-red-500 mt-1">
                  {errorAlert && errorAlert.hasOwnProperty("email") && (
                    <span className="animate-view-content">
                      {errorAlert["email"]}
                    </span>
                  )}
                </span>
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
                  class={`${
                    errorAlert.hasOwnProperty("mobile_no") && "border-red-500"
                  } shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder=" +12 3456 789"
                  required=""
                  onChange={(e) => setPhone(e.target.value)}
                />
                <span className="absolute animate-view-content text-xs text-red-500 mt-1">
                  {errorAlert && errorAlert.hasOwnProperty("mobile_no") && (
                    <span className="animate-view-content">
                      {errorAlert["mobile_no"]}
                    </span>
                  )}
                </span>
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
                  class={`${
                    errorAlert.hasOwnProperty("password") && "border-red-500"
                  } shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="••••••••"
                  required=""
                  onChange={(e) =>
                    setaddAdminData({
                      ...addAdminData,
                      password: e.target.value,
                    })
                  }
                />
                <span className="absolute animate-view-content text-xs text-red-500 mt-1">
                  {errorAlert && errorAlert.hasOwnProperty("password") && (
                    <span className="animate-view-content">
                      {errorAlert["password"]}
                    </span>
                  )}
                </span>
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
                  class={`${
                    errorAlert.hasOwnProperty("password") && "border-red-500"
                  } shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="••••••••"
                  required=""
                  onChange={(e) =>
                    setaddAdminData({
                      ...addAdminData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <span className="absolute animate-view-content text-xs text-red-500 mt-1">
                  {errorAlert && errorAlert.hasOwnProperty("password") && (
                    <span className="animate-view-content">
                      {errorAlert["password"]}
                    </span>
                  )}
                </span>
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
                  onClick={() => setViewRolesDropdown(!viewRolesDropdown)}
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

          <div class="flex items-right justify-end p-6 space-x-3 rtl:space-x-reverse w-full  border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:border-blue-500 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
              onClick={addAdmin}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default AddAdminView;
