import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosAddCircleOutline } from "react-icons/io";
const AddEventView = ({ closeModal, reload }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [viewPayment, setViewPayment] = useState(false);
  const [viewDate, setViewDate] = useState(false);
  const [viewTime, setViewTime] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateStr, setSelectedDateStr] = useState("");
  const [selectedDeadline, setSelectedDeadline] = useState("");
  const [deadlineDateStr, setDeadlineDateStr] = useState("");
  const [hours, setHours] = useState({
    hour1: "",
    hour2: "",
  });

  const [mins, setMins] = useState({
    mins1: "",
    mins2: "",
  });

  const [addEventData, setAddEventData] = useState({
    event_name: "",
    event_info: "",
    venue: "",
    payment: 0,
    capacity: 0,
    event_datetime: ``,
    payment_deadline: "",
  });

  const handleHourChange = (e, inputName) => {
    const inputHour = parseInt(e.target.value, 10);

    if (isNaN(inputHour) || inputHour < 0 || inputHour > 23) {
      console.log("Invalid time");
    } else {
      setHours((prevHours) => ({ ...prevHours, [inputName]: inputHour }));
      console.log(hours);
    }
  };

  const handleMinChange = (e, inputName) => {
    const inputMin = parseInt(e.target.value, 10);

    if (isNaN(inputMin) || inputMin < 0 || inputMin > 59) {
      console.log("Invalid time");
    } else {
      setMins((prevMin) => ({ ...prevMin, [inputName]: inputMin }));
      console.log(mins);
    }
  };

  useEffect(() => {
    const formattedDate = (date) => {
      if (!date || isNaN(date.getTime())) {
        return "";
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      //setSelectedDate(`${year}-${month}-${day}`);
      return `${year}-${month}-${day}`;
    };

    setSelectedDateStr(formattedDate(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    const formattedDate = (date) => {
      if (!date || isNaN(date.getTime())) {
        return "";
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    setDeadlineDateStr(formattedDate(selectedDeadline));
  }, [selectedDeadline]);

  const addEvent = async () => {
    try {
      if (
        addEventData.event_name !== "" &&
        addEventData.event_info !== "" &&
        addEventData.venue !== "" &&
        addEventData.payment !== null &&
        addEventData.capacity !== null &&
        selectedDateStr !== "" &&
        hours.hour1 !== "" &&
        mins.mins1 !== ""
      ) {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/event/add",
          {
            event_name: addEventData.event_name,
            event_info: addEventData.event_info,
            venue: addEventData.venue,
            capacity: addEventData.capacity,
            payment: parseFloat(addEventData.payment),
            event_datetime: `${selectedDateStr} ${hours.hour1}:${mins.mins1}:00`,
            payment_deadline:
              deadlineDateStr !== "" && hours.hour2 !== "" && mins.mins2 !== ""
                ? `${deadlineDateStr} ${hours.hour2}:${mins.mins2}:00`
                : null,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          console.log("Event added");
          toast.success("Added", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1200,
          });
          setTimeout(() => {
            closeModal();
            reload();
          }, 1500);
        } else {
          toast.error("Something went wrong", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } else {
        toast.error("Required fields are empty", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      console.error(error.message);
      console.log(addEventData);
      toast.error("Invalid inputs. Please check", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <React.Fragment>
      <div
        id="createProductModal"
        tabindex="-1"
        aria-hidden="true"
        class="ml-96 h-56 overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full"
      >
        <div class="relative p-4 w-full max-w-3xl h-full md:h-auto">
          <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <ToastContainer />
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Add Event
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="createProductModal"
                onClick={() => {
                  closeModal();
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
            </div>

            <div className="overflow-y-auto p-2 ">
              <form action="#">
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Event Name{" "}
                      <span className="required text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required=""
                      onChange={(e) =>
                        setAddEventData({
                          ...addEventData,
                          event_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex">
                    <div className="w-1/2 mx-2">
                      <label
                        for="category"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Capacity
                        <span className="required text-red-500"> *</span>
                      </label>
                      <input
                        type="number"
                        name="capacity"
                        id="capacity"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        min={0}
                        onChange={(e) =>
                          setAddEventData({
                            ...addEventData,
                            capacity: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="w-1/2 mx-2">
                      <div className="flex">
                        <label
                          for="payment"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Payment{" "}
                        </label>

                        <span
                          className="p-1 ml-2 hover:text-green-600 cursor-pointer"
                          onClick={() => setViewPayment(!viewPayment)}
                        >
                          <IoIosAddCircleOutline />
                        </span>
                      </div>
                      <div className="border rounded-lg">
                        {viewPayment && (
                          <input
                            type="number"
                            name="payment"
                            id="payment"
                            class="bg-gray-50 Slidedown border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            min={0}
                            onChange={(e) =>
                              setAddEventData({
                                ...addEventData,
                                payment: e.target.value,
                              })
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div class="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-4">
                    <div className="">
                      <label
                        for="weight"
                        class="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Date <span className="required text-red-500"> *</span>
                      </label>
                      <DatePicker
                        selected={selectedDate}
                        className="w-44 rounded border border-gray-300 "
                        onChange={(date) => {
                          setSelectedDate(date);
                        }}
                      />
                    </div>
                    <div className="ml-2">
                      <label
                        for="length"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Time<span className="required text-red-500"> *</span>
                      </label>
                      <div className="flex w-full">
                        <input
                          type="number"
                          name="hour1"
                          id="hour1"
                          min={0}
                          max={23}
                          value={hours.hour1}
                          onChange={(e) => handleHourChange(e, "hour1")}
                          className="mr-1 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                        <div className="text-3xl"> : </div>
                        <input
                          type="number"
                          name="mins1"
                          id="mins1"
                          min={0}
                          max={59}
                          value={mins.mins1}
                          onChange={(e) => handleMinChange(e, "mins1")}
                          class="ml-1 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="flex">
                        <label
                          for="weight"
                          class="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Deadline date
                        </label>
                        <span
                          className="p-1 ml-2 hover:text-green-600 cursor-pointer"
                          onClick={() => setViewDate(!viewDate)}
                        >
                          <IoIosAddCircleOutline />
                        </span>
                      </div>
                      <div className="border rounded-lg">
                        {viewDate && (
                          <DatePicker
                            selected={selectedDeadline}
                            className="w-44 rounded Slidedown border border-gray-300"
                            onChange={(date) => {
                              setSelectedDeadline(date);
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="ml-2">
                      <div className="flex">
                        <label
                          for="length"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Time
                        </label>
                        <span
                          className="p-1 ml-2 hover:text-green-600 cursor-pointer"
                          onClick={() => setViewTime(!viewTime)}
                        >
                          <IoIosAddCircleOutline />
                        </span>
                      </div>
                      <div className="border-t rounded-lg">
                        {viewTime && (
                          <div className="flex Slidedown w-full">
                            <input
                              type="number"
                              name="hour2"
                              id="hour2"
                              value={hours.hour2}
                              onChange={(e) => handleHourChange(e, "hour2")}
                              class="mr-1 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                            <div className="text-3xl"> : </div>
                            <input
                              type="number"
                              name="mins2"
                              id="mins2"
                              value={mins.mins2}
                              onChange={(e) => handleMinChange(e, "mins2")}
                              class="ml-1 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="sm:col-span-2">
                    <label
                      for="description"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Event description
                      <span className="required text-red-500"> *</span>
                    </label>
                    <textarea
                      id="description"
                      rows="4"
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write product description here"
                      onChange={(e) =>
                        setAddEventData({
                          ...addEventData,
                          event_info: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div class="sm:col-span-2">
                    <label
                      for="description"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Venue<span className="required text-red-500"> *</span>
                    </label>
                    <textarea
                      id="venue"
                      rows="2"
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write product description here"
                      onChange={(e) =>
                        setAddEventData({
                          ...addEventData,
                          venue: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div>

                <div class="mb-4">
                  <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Images
                  </span>
                  <div class="flex justify-center items-center w-full">
                    <label
                      for="dropzone-file"
                      class="flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col justify-center items-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          class="mb-3 w-10 h-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewbox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Click to upload</span>
                          or drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input id="dropzone-file" type="file" class="hidden" />
                    </label>
                  </div>
                </div>
                <div class="ml-56 items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    class="w-full sm:w-auto justify-center text-white inline-flex bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={addEvent}
                  >
                    Add event
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AddEventView;
