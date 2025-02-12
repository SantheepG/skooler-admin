import React, { useState, useEffect } from "react";
import EventRow from "./EventRow";
import AddEventView from "./AddEventView";
import EventPreview from "./EventPreview";
import EditEventView from "./EditEventView";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccessDenied from "../AccessDenied";
import {
  DeleteBooking,
  DeleteEvent,
  FetchBookings,
  FetchEvents,
  UpdateBookingStatus,
} from "../../api/EventApi";
import BookingRow from "./BookingRow";
import BookingSlipView from "./BookingSlipView";
import { useAppContext } from "../../AppContext";

const ManageEvents = ({ bool }) => {
  const { school } = useAppContext();
  const [fetchedEvents, setFetchedEvents] = useState(null);
  const [fetchedBookings, setFetchedBookings] = useState(null);
  const [eventsToView, setEventsToView] = useState([]);
  const [bookingsToView, setBookingsToView] = useState([]);
  const [overlayClicked, setOverlayClicked] = useState(false);
  const [addEventClicked, setAddEventClicked] = useState(false);
  const [editEventClicked, setEditEventClicked] = useState(false);
  const [previewEventClicked, setpreviewEventClicked] = useState(false);
  const [deleteEventClicked, setdeleteEventClicked] = useState(false);
  const [deleteBookingClicked, setdeleteBookingClicked] = useState(false);
  const [currentEvent, setCurrentEvent] = useState("");
  const [currentBooking, setCurrentBooking] = useState("");
  const [reloadComponent, setReloadComponent] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [bookingClicked, setBookingClicked] = useState(false);
  const [viewSlip, setViewSlip] = useState(false);
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
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchBookings = async () => {
      try {
        const response = await FetchBookings();
        if (response && response.data) {
          setFetchedBookings(response.data.bookings);
          setBookingsToView(response.data.bookings);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (bool) {
      fetchBookings();
      fetchEvents();
      setReloadComponent(false);
    }
  }, [reloadComponent]);

  const deleteEvent = async (id) => {
    try {
      const response = await DeleteEvent(id);
      if (response.status === 200) {
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

  const searchBooking = (event) => {
    event.preventDefault();
    const inputValue = event.target.value.toLowerCase();

    if (inputValue === "") {
      setBookingsToView(fetchedBookings);
    } else {
      let matchedBookings = fetchedBookings.filter(
        (item) =>
          item.event_name.toLowerCase().includes(inputValue) ||
          item.id === parseInt(inputValue) ||
          item.user_name === inputValue
      );
      setBookingsToView(matchedBookings);
    }
  };

  const filterBooking = (event) => {
    event.preventDefault();
    if (event.target.value === "All") {
      setBookingsToView(fetchedBookings);
    } else if (event.target.value === "Recent") {
      //descending order of created_at
      let sortedBookings = [...fetchedBookings].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setBookingsToView(sortedBookings);
    } else if (event.target.value === "Earliest") {
      //ascending order of created_at
      let sortedBookings = [...fetchedBookings].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setBookingsToView(sortedBookings);
    }
  };
  const deleteBooking = async () => {
    try {
      const response = await DeleteBooking(currentBooking.id);
      if (response.status === 200) {
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

  const updateBookingStatus = async (statusChange, bookingId, userId) => {
    try {
      let data = {
        booking_id: bookingId,
        user_id: userId,
        status: statusChange,
      };
      const response = await UpdateBookingStatus(data);
      if (response.status === 200) {
        setReloadComponent(true);
        toast.success("Status updated", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.error("Something went wrong", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      {bool ? (
        <div className="animate-view-content relative m-5">
          <div className="fixed">
            <ToastContainer />
          </div>
          {!bookingClicked && (
            <div class="animate-view-content relative overflow-x-auto shadow-md sm:rounded-lg admin-table">
              <div
                class={`flex items-center lg:px-6 justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900 ${
                  overlayClicked ? "opacity-40" : ""
                }`}
              >
                <div className="flex">
                  <div class="mx-4">
                    <div class="rounded-lg border border-gray-300 bg-white py-0.2 px-3">
                      {" "}
                      <nav class="flex flex-wrap gap-4">
                        <a
                          href="#"
                          className={`${
                            !bookingClicked ? "bg-gray-200" : ""
                          } whitespace-nowrap inline-flex rounded-lg py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-900`}
                          onClick={() => setBookingClicked(false)}
                        >
                          {" "}
                          Events
                        </a>
                        <a
                          href="#"
                          className={`${
                            bookingClicked ? "bg-gray-200" : ""
                          } whitespace-nowrap inline-flex rounded-lg py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-900`}
                          onClick={() => setBookingClicked(true)}
                        >
                          {" "}
                          Bookings
                        </a>
                      </nav>
                    </div>
                  </div>{" "}
                  <div>
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
                        placeholder="Search events"
                        onChange={searchEvent}
                      />
                    </div>
                  </div>
                </div>

                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-2 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <button
                    type="button"
                    id="createEventButton"
                    data-modal-toggle="createEventModal"
                    class="inline-flex items-center mt-2 px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:border-blue-500 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
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
                      Price ( {school.currency} )
                    </th>

                    <th scope="col" class="p-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fetchedEvents !== null ? (
                    eventsToView.length !== 0 ? (
                      eventsToView.map((event) => (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <EventRow
                            key={event.id}
                            event={event}
                            openDropdown={openDropdown}
                            toggleDropdown={() => toggleDropdown(event.id)}
                            previewEvent={() => {
                              setOverlayClicked(!overlayClicked);
                              setpreviewEventClicked(!previewEventClicked);
                              setCurrentEvent(event);
                            }}
                            editEvent={() => {
                              setOverlayClicked(!overlayClicked);
                              setEditEventClicked(!editEventClicked);
                              setCurrentEvent(event);
                            }}
                            deleteEvent={() => {
                              setOverlayClicked(!overlayClicked);
                              setdeleteEventClicked(!deleteEventClicked);
                              setCurrentEvent(event);
                            }}
                          />
                        </tr>
                      ))
                    ) : (
                      <div class="border-b h-16 p-16 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        No events available
                      </div>
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
          )}
          {bookingClicked && (
            <div class="animate-view-content relative overflow-x-auto shadow-md sm:rounded-lg admin-table">
              <div
                class={`flex items-center lg:px-6 justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900 ${
                  overlayClicked ? "opacity-40" : ""
                }`}
              >
                <div className="flex">
                  <div class="mx-4">
                    <div class="rounded-lg border border-gray-300 bg-white py-0.2 px-3">
                      <nav class="flex flex-wrap gap-4">
                        <a
                          href="#"
                          className={`${
                            !bookingClicked ? "bg-gray-200" : ""
                          } whitespace-nowrap inline-flex rounded-lg py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-900`}
                          onClick={() => setBookingClicked(false)}
                        >
                          {" "}
                          Events
                        </a>
                        <a
                          href="#"
                          className={`${
                            bookingClicked ? "bg-gray-200" : ""
                          } whitespace-nowrap inline-flex rounded-lg py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-900`}
                          onClick={() => setBookingClicked(true)}
                        >
                          {" "}
                          Bookings
                        </a>
                      </nav>
                    </div>
                  </div>
                  <div>
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
                        placeholder="Search bookings"
                        onChange={searchBooking}
                      />
                    </div>
                  </div>
                </div>

                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={(e) => filterBooking(e)}
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
                      User
                    </th>
                    <th scope="col" class="p-4 px-2">
                      Tickets
                    </th>
                    <th scope="col" class="p-4 px-2">
                      Paid ( {school.currency} )
                    </th>
                    <th scope="col" class="p-4 px-2">
                      Status
                    </th>
                    <th scope="col" class="p-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fetchedBookings !== null ? (
                    bookingsToView.length !== 0 ? (
                      bookingsToView.map((booking, index) => (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <BookingRow
                            key={booking.id}
                            booking={booking}
                            verified={() => {
                              setCurrentBooking(booking);
                              updateBookingStatus(
                                "Verified",
                                booking.id,
                                booking.user_id
                              );
                            }}
                            denied={() => {
                              setCurrentBooking(booking);
                              updateBookingStatus(
                                "Denied",
                                booking.id,
                                booking.user_id
                              );
                            }}
                            viewSlip={() => {
                              setOverlayClicked(!overlayClicked);
                              setViewSlip(true);
                              setCurrentBooking(booking);
                            }}
                            deleteClicked={() => {
                              setCurrentBooking(booking);
                              setdeleteBookingClicked(!deleteBookingClicked);
                              setOverlayClicked(!overlayClicked);
                            }}
                          />
                        </tr>
                      ))
                    ) : (
                      <div class="border-b h-16 p-16 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        No bookings available
                      </div>
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
          )}
          {previewEventClicked && (
            <div
              id="previewUserModal"
              tabindex="-1"
              aria-hidden="true"
              className={`fixed top-16 left-0 right-0 bottom-0 z-50 lg:flex lg:items-center lg:justify-center lg:top-6 lg:mx-14 md:mx-36 md:ml-64 p-4 overflow-x-hidden overflow-y-auto h-full`}
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
              id="addEventModal"
              tabindex="-1"
              aria-hidden="true"
              className={`fixed top-16 left-0 right-0 bottom-0 z-50 lg:flex lg:items-center lg:justify-center lg:top-6 lg:mx-14 md:mx-6 md:ml-64 p-4 overflow-x-hidden overflow-y-auto h-full`}
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
              id="editEventModal"
              tabindex="-1"
              aria-hidden="true"
              className={`fixed top-16 left-0 right-0 bottom-0 z-50 lg:flex lg:items-center lg:justify-center lg:top-0 lg:mx-14 md:mx-6 md:ml-64 p-4 overflow-x-hidden overflow-y-auto h-full`}
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
              className={`fixed top-16 left-0 right-0 bottom-0 z-50 lg:flex lg:items-center lg:justify-center lg:top-0 lg:mx-14 md:mx-6 md:ml-64 p-4 overflow-x-hidden overflow-y-auto h-full`}
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
          {deleteBookingClicked && (
            <div
              id="delete-modal-1"
              tabindex="-1"
              className={`fixed top-16 left-0 right-0 bottom-0 z-50 lg:flex lg:items-center lg:justify-center lg:top-0 lg:mx-14 md:mx-6 md:ml-64 p-4 overflow-x-hidden overflow-y-auto h-full`}
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
                      setdeleteBookingClicked(!deleteBookingClicked);
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
                      Are you sure you want to delete this booking?
                    </h3>
                    <button
                      data-modal-toggle="delete-modal"
                      type="button"
                      class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      onClick={() => {
                        deleteBooking();
                        setOverlayClicked(!overlayClicked);
                        setdeleteBookingClicked(!deleteBookingClicked);
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
                        setdeleteBookingClicked(!deleteBookingClicked);
                      }}
                    >
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {viewSlip && (
            <div
              id="EditOrderModal"
              tabindex="-1"
              aria-hidden="true"
              className={`fixed top-16 left-0 right-0 bottom-0 z-50 lg:flex lg:items-center lg:justify-center lg:top-0 lg:mx-14 md:mx-6 md:ml-64 p-4 overflow-x-hidden overflow-y-auto h-full`}
            >
              <BookingSlipView
                school={school}
                booking={currentBooking}
                closeModal={() => {
                  setOverlayClicked(!overlayClicked);
                  setViewSlip(!viewSlip);
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

export default ManageEvents;
