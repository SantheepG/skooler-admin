import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import ComplaintView from "./ComplaintView";
import ComplaintRow from "./ComplaintRow";
import AccessDenied from "../AccessDenied";
import { FetchComplaints } from "../../api/ComplaintApi";
const ManageComplaints = ({ bool }) => {
  const [fetchedComplaints, setFetchedComplaints] = useState(null);
  const [complaintsToView, setComplaintsToView] = useState([]);
  const [overlayClicked, setOverlayClicked] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState("");
  const [reloadComponent, setReloadComponent] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await FetchComplaints();
        if (response && response.data) {
          setFetchedComplaints(response.data.complaints);
          setComplaintsToView(response.data.complaints);
          setReloadComponent(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (bool) {
      fetchComplaints();
    }
  }, [reloadComponent]);

  const searchHandler = (event) => {
    event.preventDefault();
    const inputValue = event.target.value.toLowerCase();

    if (inputValue === "") {
      setComplaintsToView(fetchedComplaints);
    } else {
      let matchedComplaints = fetchedComplaints.filter(
        (item) =>
          item.user_id === parseInt(inputValue) ||
          item.id === parseInt(inputValue)
      );
      setComplaintsToView(matchedComplaints);
    }
  };

  const filterHandler = (event) => {
    event.preventDefault();

    if (event.target.value === "All") {
      setComplaintsToView(fetchedComplaints);
    } else if (event.target.value === "Pending") {
      let matchedComplaints = fetchedComplaints.filter(
        (item) => item.status === "Pending"
      );
      setComplaintsToView(matchedComplaints);
    } else if (event.target.value === "Resolved") {
      let matchedComplaints = fetchedComplaints.filter(
        (item) => item.status === "Resolved"
      );
      setComplaintsToView(matchedComplaints);
    } else if (event.target.value === "Recent") {
      //descending order of created_at
      let sortedComplaints = [...fetchedComplaints].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setComplaintsToView(sortedComplaints);
    } else if (event.target.value === "Earliest") {
      //ascending order of created_at
      let sortedComplaints = [...fetchedComplaints].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setComplaintsToView(sortedComplaints);
    }
  };

  return (
    <React.Fragment>
      {bool ? (
        <div className="animate-view-content relative m-5">
          <Toaster className="notifier" />
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg admin-table">
            <div
              class={`flex items-center lg:px-6 justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900 ${
                overlayClicked ? "opacity-40" : ""
              }`}
            >
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
                  className="block ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for complaints"
                  onChange={searchHandler}
                />
              </div>

              <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={filterHandler}
                >
                  <option value="" disabled selected>
                    Filter
                  </option>
                  <option value="All">All</option>
                  <option value="Recent">Recent</option>
                  <option value="Earliest">Earliest</option>
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
            <table
              className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ${
                overlayClicked ? "opacity-40" : ""
              }`}
            >
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="p-4 p">
                    # ID
                  </th>
                  <th scope="col" class="p-4">
                    User ID
                  </th>
                  <th scope="col" class="p-4">
                    Product
                  </th>
                  <th scope="col" class="p-4 ">
                    Description
                  </th>
                  <th scope="col" class="p-4">
                    Status
                  </th>

                  <th scope="col" class="p-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {fetchedComplaints !== null ? (
                  complaintsToView.length !== 0 ? (
                    complaintsToView.map((complaint) => (
                      <ComplaintRow
                        key={complaint.id}
                        reload={() => setReloadComponent(true)}
                        complaint={complaint}
                        overlayClicked={() => {
                          setOverlayClicked(!overlayClicked);
                          setCurrentComplaint(complaint);
                        }}
                      />
                    ))
                  ) : (
                    <div className="p-10">Nothing available</div>
                  )
                ) : (
                  <div class="border-b h-16 p-16 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                  </div>
                )}
              </tbody>
            </table>
          </div>
          {overlayClicked && (
            <div
              id="EditComplaintModal"
              tabindex="-1"
              aria-hidden="true"
              className={`fixed top-16 left-0 right-0 bottom-0 z-50 lg:flex lg:items-center lg:justify-center lg:top-6 lg:mx-14 md:mx-36 md:ml-64 p-4 overflow-x-hidden overflow-y-auto h-full`}
            >
              <ComplaintView
                complaint={currentComplaint}
                reload={() => setReloadComponent(true)}
                closeModal={() => {
                  setOverlayClicked(!overlayClicked);
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <AccessDenied />
      )}
    </React.Fragment>
  );
};

export default ManageComplaints;
