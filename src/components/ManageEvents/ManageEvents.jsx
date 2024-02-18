import React, { useState, useEffect } from "react";
import axios from "axios";
import EventRow from "./EventRow";
import AddEventView from "./AddEventView";
import EventPreview from "./EventPreview";
import EditEventView from "./EditEventView";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccessDenied from "../AccessDenied";
import { DeleteEvent, FetchEvents } from "../../api/EventApi";
const ManageEvents = ({ bool }) => {
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [eventsToView, setEventsToView] = useState([]);
  const [overlayClicked, setOverlayClicked] = useState(false);
  const [addEventClicked, setAddEventClicked] = useState(false);
  const [editEventClicked, setEditEventClicked] = useState(false);
  const [previewEventClicked, setpreviewEventClicked] = useState(false);
  const [deleteEventClicked, setdeleteEventClicked] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentEvent, setCurrentEvent] = useState("");
  const [reloadComponent, setReloadComponent] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (Id) => {
    setOpenDropdown((prevOpenDropdown) =>
      prevOpenDropdown === Id ? null : Id
    );
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await FetchEvents();
        if (response && response.data) {
          setFetchedEvents(response.data.events);
          setEventsToView(response.data.events);
          setReloadComponent(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, [reloadComponent]);

  const deleteEvent = async (id) => {
    try {
      const response = await DeleteEvent(id);
      if (response) {
        toast.success("Successfully deleted", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1200,
        });
        setTimeout(() => {
          setReloadComponent(true);
        }, 1300);
      } else {
        toast.error("Something went wrong", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const searchEvent = (event) => {
    event.preventDefault();
    const inputValue = event.target.value.toLowerCase();

    if (inputValue === "") {
      setEventsToView(fetchedEvents);
    } else {
      let matchedEvents = fetchedEvents.filter(
        (item) =>
          item.event_name.toLowerCase().includes(inputValue) ||
          item.id === parseInt(inputValue)
      );
      setEventsToView(matchedEvents);
    }
  };

  const filterEvent = (event) => {
    event.preventDefault();
    if (event.target.value === "All") {
      setEventsToView(fetchedEvents);
    } else if (event.target.value === "Recent") {
      //descending order of created_at
      let sortedEvents = [...fetchedEvents].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setEventsToView(sortedEvents);
    } else if (event.target.value === "Earliest") {
      //ascending order of created_at
      let sortedEvents = [...fetchedEvents].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setEventsToView(sortedEvents);
    }
  };
  return (
    <React.Fragment>
      {bool ? (
        <div className="viewContent relative m-5">
          <div className="fixed">
            <ToastContainer />
          </div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg admin-table">
            <div
              class={`flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900 ${
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
                  placeholder="Search for events"
                  onChange={searchEvent}
                />
              </div>

              <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  type="button"
                  id="createProductButton"
                  data-modal-toggle="createProductModal"
                  class="flex items-center justify-center text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  onClick={() => {
                    setAddEventClicked(!addEventClicked);
                    setOverlayClicked(!overlayClicked);
                  }}
                >
                  Add event
                </button>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={(e) => filterEvent(e)}
                >
                  <option name={"All"} value={"All"}>
                    All
                  </option>
                  <option name={"Recent"} value={"Recent"}>
                    Recent
                  </option>
                  <option name={"Earliest"} value={"Earliest"}>
                    Earliest
                  </option>
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
                    ID
                  </th>
                  <th scope="col" class="p-4">
                    Event
                  </th>
                  <th scope="col" class="p-4">
                    Event info
                  </th>
                  <th scope="col" class="p-4 px-8">
                    Venue
                  </th>
                  <th scope="col" class="p-4 px-2">
                    Capacity
                  </th>
                  <th scope="col" class="p-4 px-2">
                    Reserved
                  </th>
                  <th scope="col" class="p-4 px-6">
                    Price ($)
                  </th>

                  <th scope="col" class="p-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {eventsToView.length !== 0 ? (
                  eventsToView.map((event, index) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <EventRow
                        key={event.id}
                        event={event}
                        openDropdown={openDropdown}
                        toggleDropdown={() => toggleDropdown(event.id)}
                        previewEvent={() => {
                          setOverlayClicked(!overlayClicked);
                          setpreviewEventClicked(!previewEventClicked);
                          setCurrentEventIndex(index);
                          setCurrentEvent(event);
                        }}
                        editEvent={() => {
                          setOverlayClicked(!overlayClicked);
                          setEditEventClicked(!editEventClicked);
                          setCurrentEventIndex(index);
                          setCurrentEvent(event);
                        }}
                        deleteEvent={() => {
                          setOverlayClicked(!overlayClicked);
                          setdeleteEventClicked(!deleteEventClicked);
                          setCurrentEventIndex(index);
                          setCurrentEvent(event);
                        }}
                      />
                    </tr>
                  ))
                ) : (
                  <div class="border-b h-16 p-16 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    No events available
                  </div>
                )}
              </tbody>
            </table>
          </div>
          {previewEventClicked && (
            <div
              id="previewUserModal"
              tabindex="-1"
              aria-hidden="true"
              className={`flex fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0.1rem)] max-h-full`}
            >
              <EventPreview
                closeModal={() => {
                  setOverlayClicked(!overlayClicked);
                  setpreviewEventClicked(!previewEventClicked);
                }}
                event={currentEvent}
              />
            </div>
          )}
          {addEventClicked && (
            <div
              id="addProductModal"
              tabindex="-1"
              aria-hidden="true"
              className={`flex mt-6 fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0.1rem)] max-h-full`}
            >
              <AddEventView
                reload={() => setReloadComponent(true)}
                closeModal={() => {
                  setAddEventClicked(!addEventClicked);
                  setOverlayClicked(!overlayClicked);
                }}
              />
            </div>
          )}
          {editEventClicked && (
            <div
              id="editProductModal"
              tabindex="-1"
              aria-hidden="true"
              className={`flex fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0.1rem)] max-h-full`}
            >
              <EditEventView
                event={currentEvent}
                reload={() => setReloadComponent(true)}
                closeModal={() => {
                  setEditEventClicked(!editEventClicked);
                  setOverlayClicked(!overlayClicked);
                }}
              />
            </div>
          )}
          {deleteEventClicked && (
            <div
              id="delete-modal"
              tabindex="-1"
              class={`flex fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0.1rem)] max-h-full`}
            >
              <div class="relative w-full h-auto max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-toggle="delete-modal"
                    reload={() => setReloadComponent(true)}
                    onClick={() => {
                      setOverlayClicked(!overlayClicked);
                      setdeleteEventClicked(!deleteEventClicked);
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
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
                    <span class="sr-only">Close modal</span>
                  </button>
                  <div class="p-6 text-center">
                    <svg
                      aria-hidden="true"
                      class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                      fill="none"
                      stroke="currentColor"
                      viewbox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this event?
                    </h3>
                    <button
                      data-modal-toggle="delete-modal"
                      type="button"
                      class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      onClick={() => {
                        deleteEvent(currentEvent.id);
                        setOverlayClicked(!overlayClicked);
                        setdeleteEventClicked(!deleteEventClicked);
                      }}
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      data-modal-toggle="delete-modal"
                      type="button"
                      class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      onClick={() => {
                        setOverlayClicked(!overlayClicked);
                        setdeleteEventClicked(!deleteEventClicked);
                      }}
                    >
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <AccessDenied />
      )}
    </React.Fragment>
  );
};

export default ManageEvents;
