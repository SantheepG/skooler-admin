import React, { useState, useEffect } from "react";
import "./ManageAdmins.css";
import axios from "axios";
import defaultImg from "../../assets/default-avatar.png";
import AdminRow from "./AdminRow";
import DeleteView from "./DeleteView";
import { Toaster, toast } from "react-hot-toast";
import AdminDetailsView from "./AdminDetailsView";
import AccessDenied from "../AccessDenied";
import AddAdminView from "./AddAdminView";
import { ChangeStatus, DeleteAdmin, FetchAdmins } from "../../api/AdminApi";

const ManageAdmins = ({ bool }) => {
  const [fetchedAdmins, setFetchedAdmins] = useState([]);
  const [adminsToView, setAdminsToView] = useState([]);
  const [currentRoles, setCurrentRoles] = useState([]);
  const [currentAdmin, setCurrentAdmin] = useState([]);
  const [viewAdminDetails, setViewAdminDetails] = useState(false);
  const [viewAddAdmin, setviewAddAdmin] = useState(false);
  const [viewDeleteAdmin, setViewDeleteAdmin] = useState(false);
  const [reloadComponent, setReloadComponent] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (adminId) => {
    setOpenDropdown((prevOpenDropdown) =>
      prevOpenDropdown === adminId ? null : adminId
    );
  };

  const ViewAdminOverlayHandler = (admin, selectedRoles) => {
    setViewAdminDetails(!viewAdminDetails);
    setCurrentAdmin(admin);
    setCurrentRoles(selectedRoles);
  };

  const toggleAdminStatus = async (id, isActive) => {
    try {
      const response = await ChangeStatus(id, isActive);
      if (response.status === 200) {
        setFetchedAdmins(response.data.admins);
        setAdminsToView(response.data.admins);
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
          const response = await FetchAdmins();
          if (response) {
            setAdminsToView(response.data.admins);
            setFetchedAdmins(response.data.admins);
          } else {
            console.log(response);
          }
        } catch (error) {
          console.error("Fetch error: ", error);
        }
      }
      setReloadComponent(false);
    };
    fetchAdmins();
  }, [reloadComponent]);

  const ViewAddAdminHandler = () => {
    setviewAddAdmin(!viewAddAdmin);
  };

  const deleteAdmin = async () => {
    try {
      let response = await DeleteAdmin(currentAdmin.id);
      if (response) {
        toast.success("Admin deleted", {
          duration: 1200,
          position: "top-center",
          //icon: "❌",
        });
        setTimeout(() => {
          setReloadComponent(true);
        }, 1300);
      } else {
        toast.error("Failed to delete admin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (event) => {
    event.preventDefault();
    const inputValue = event.target.value.toLowerCase();
    if (inputValue === "") {
      setAdminsToView(fetchedAdmins);
    } else {
      let matchedAdmins = fetchedAdmins.filter(
        (item) =>
          item.first_name.toLowerCase().includes(inputValue) ||
          item.mobile_no.toLowerCase().includes(inputValue) ||
          item.id === parseInt(inputValue)
      );
      setAdminsToView(matchedAdmins);
    }
  };

  return (
    <React.Fragment>
      {bool ? (
        <div className="relative m-5 viewContent">
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
                  className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for admins"
                  onChange={handleSearch}
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
                viewAdminDetails || viewAddAdmin || viewDeleteAdmin
                  ? "opacity-30"
                  : ""
              }`}
            >
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    #ID
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Admin
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
                {adminsToView.length !== 0 ? (
                  adminsToView.map((admin) => (
                    <tr
                      key={admin.id}
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <AdminRow
                        adminData={admin}
                        openDropdown={openDropdown}
                        toggleDropdown={() => toggleDropdown(admin.id)}
                        toggleAdminStatus={toggleAdminStatus}
                        ViewAdminOverlayHandler={ViewAdminOverlayHandler}
                        viewDeleteAdmin={() => {
                          setViewDeleteAdmin(!viewDeleteAdmin);
                          setCurrentAdmin(admin);
                        }}
                      />
                    </tr>
                  ))
                ) : (
                  <tr class="h-16 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td colSpan="number of columns" className="text-center">
                      No admins here
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {viewAdminDetails && (
              <div
                id="editUserModal"
                tabindex="-1"
                aria-hidden="true"
                className={`flex fixed mt-4 top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
              >
                <AdminDetailsView
                  ViewAdminOverlayHandler={() => ViewAdminOverlayHandler()}
                  reload={(bool) => setReloadComponent(bool)}
                  admin={currentAdmin}
                />
              </div>
            )}

            {viewAddAdmin && (
              <div
                id="addAdminModal"
                tabindex="-1"
                aria-hidden="true"
                className={`flex fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full `}
              >
                <AddAdminView
                  closeModal={() => {
                    setviewAddAdmin(false);
                  }}
                  reload={() => setReloadComponent(true)}
                />
              </div>
            )}
            {viewDeleteAdmin && (
              <div
                id="addAdminModal"
                tabindex="-1"
                aria-hidden="true"
                className={`flex fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full `}
              >
                <DeleteView
                  deleteAdmin={deleteAdmin}
                  closeModal={() => setViewDeleteAdmin(!viewDeleteAdmin)}
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

export default ManageAdmins;
