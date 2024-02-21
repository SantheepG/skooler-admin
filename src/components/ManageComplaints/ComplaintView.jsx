import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  DeleteComplaint,
  FetchUserContact,
  UpdateStatus,
} from "../../api/ComplaintApi";
import { RiDeleteBin5Line } from "react-icons/ri";
const ComplaintView = ({ complaint, closeModal, reload }) => {
  const [userID, setUserID] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const fetchUserContact = async () => {
      try {
        const response = await FetchUserContact(complaint.user_id);
        if (response) {
          setUserID(response.data.user_id);
          setFname(response.data.fname);
          setLname(response.data.lname !== null && response.data.lname);
          setEmail(response.data.email);
          setMobile(response.data.mobile_no);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserContact();
  }, [closeModal]);

  const updateStatus = async () => {
    try {
      if (newStatus !== "") {
        const response = await UpdateStatus(userID, complaint.id, newStatus);
        if (response) {
          console.log(response.data);
          toast.success("Status changed", {
            duration: 1200,
            position: "center",
            //icon: "❌",
          });

          reload();
          setTimeout(() => {
            closeModal();
          }, 1500);
        } else {
          console.error("");
          toast.error("Something went wrong", {
            duration: 1200,
            position: "center",
            //icon: "❌",
          });
        }
      } else {
        toast.error("No changes have been made", {
          duration: 1200,
          position: "center",
          //icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await DeleteComplaint(complaint.id);
      if (response.status === 200) {
        console.log(response.data);
        toast.success("Deleted", {
          duration: 1200,
          position: "center",
          //icon: "❌",
        });

        setTimeout(() => {
          closeModal();
          reload();
        }, 1500);
      } else {
        console.error("");
        toast.error("Something went wrong", {
          duration: 1200,
          position: "center",
          //icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      {complaint !== null && (
        <div class="relative w-full max-w-xl max-h-full">
          <form class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <Toaster className="notifier z-100" />
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Complaint details
                <div className="text-xs text-gray-500">
                  Complaint ID : # {complaint.id}
                </div>
              </h3>

              <div className="flex">
                <span
                  className="mt-2 mx-6 hover:text-red-600 cursor-pointer"
                  onClick={handleDelete}
                >
                  <RiDeleteBin5Line />
                </span>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="editUserModal"
                  onClick={() => closeModal()}
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
                    <a href="#">Close</a>
                  </span>
                </button>
              </div>
            </div>
            <div className="p-4 h-96 overflow-y-auto">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-7 sm:col-span-3">
                  <div className="">
                    <label
                      for="weight"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Order ID
                    </label>
                  </div>
                  <div className="mt-2">
                    <div className="flex w-full px-4 bg-gray-100 rounded py-2">
                      {complaint.order_id}
                    </div>
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="last-name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    status
                  </label>
                  <select
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option
                      value="Pending"
                      selected={complaint.status === "Pending"}
                    >
                      Pending
                    </option>
                    <option
                      value="Resolved"
                      selected={complaint.status === "Resolved"}
                    >
                      Resolved
                    </option>
                  </select>
                </div>
                <div class="sm:col-span-6">
                  <label
                    for="description"
                    class="block ml-1 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Complaint
                  </label>
                  <div
                    id="venue"
                    rows="2"
                    class="grid grid-cols-6 gap-6 block mt-6 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <div class="col-span-7 sm:col-span-3">
                      <div className="">
                        <label
                          for="weight"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Product
                        </label>
                      </div>
                      <div className="mt-2">
                        <div className="w-full px-4 bg-gray-100 rounded py-2">
                          <div>
                            <span className="text-gray-500">Product ID : </span>
                            <span className="">{complaint.product_id}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Name : </span>
                            <span className="">{complaint.product_name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="last-name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        User
                      </label>
                      <div className="mt-2">
                        <div className="w-full px-4 bg-gray-100 rounded py-2">
                          <div>
                            <span className="text-gray-500">
                              # {complaint.user_id} -{" "}
                            </span>
                            <span>
                              {fname + " "}
                              {lname}
                            </span>
                          </div>
                          <div className="mt-1">
                            <span className="text-gray-500">{email}</span>
                          </div>
                          <div className="mt-1">
                            <span className="text-gray-500">{mobile}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="ml-36 pb-8 items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                className="w-full sm:w-auto justify-center text-white inline-flex bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={updateStatus}
              >
                Update
              </button>

              <button
                data-modal-toggle="createProductModal"
                type="button"
                class="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => {
                  closeModal();
                }}
              >
                <svg
                  class="mr-1 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                Discard
              </button>
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};
export default ComplaintView;
