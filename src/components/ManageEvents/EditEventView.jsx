import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UpdateEvent } from "../../api/EventApi";
const EditEventView = ({ closeModal, event, reload }) => {
  const [updateEventData, setUpdateEventData] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateStr, setSelectedDateStr] = useState("");
  const [selectedDeadline, setSelectedDeadline] = useState("");
  const [deadlineDateStr, setDeadlineDateStr] = useState("");
  const [capacityChange, setCapacityChange] = useState(0);
  const [hours, setHours] = useState({
    hour1: "",
    hour2: "",
  });

  const [mins, setMins] = useState({
    mins1: "",
    mins2: "",
  });

  useEffect(() => {
    setCapacityChange(event.capacity);
    setUpdateEventData(event);
  }, [event]);

  const handleHourChange = (e, inputName) => {
    const inputHour = parseInt(e.target.value, 10);

    if (isNaN(inputHour) || inputHour < 0 || inputHour > 23) {
      console.log("Invalid time");
    } else {
      setHours((prevHours) => ({
        ...prevHours,
        [inputName]: inputHour.toString().padStart(2, "0"),
      }));
      console.log(hours);
    }
  };

  const handleMinChange = (e, inputName) => {
    const inputMin = parseInt(e.target.value, 10);

    if (isNaN(inputMin) || inputMin < 0 || inputMin > 59) {
      console.log("Invalid time");
    } else {
      setMins((prevMin) => ({
        ...prevMin,
        [inputName]: inputMin.toString().padStart(2, "0"),
      }));
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

  const updateEvent = async () => {
    try {
      if (
        updateEventData.event_name !== "" &&
        updateEventData.event_info !== "" &&
        updateEventData.payment !== null &&
        selectedDateStr !== "" &&
        hours.hour1 !== "" &&
        mins.mins1 !== ""
      ) {
        const response = await UpdateEvent({
          id: event.id,
          event_name: updateEventData.event_name,
          event_info: updateEventData.event_info,
          venue: updateEventData.venue,
          capacity: capacityChange,
          payment: parseFloat(updateEventData.payment),
          event_datetime: `${selectedDateStr} ${hours.hour1}:${mins.mins1}:00`,
          payment_deadline:
            deadlineDateStr !== "" && hours.hour2 !== "" && mins.mins2 !== ""
              ? `${deadlineDateStr} ${hours.hour2}:${mins.mins2}:00`
              : null,
        });

        if (response.status === 200) {
          toast.success("Updated", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setTimeout(() => {
            closeModal();
            reload();
          }, 1500);
        } else {
          toast.error("Invalid inputs. Please check", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } else {
        toast.error("Required fields are empty", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid inputs. Please check", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <React.Fragment>
      {event ? (
        <div class="relative w-full max-w-5xl max-h-full">
          <form class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <ToastContainer />
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Event
                <div className="text-xs text-gray-500">
                  Event ID : #{event.id}
                </div>
              </h3>

              <div>
                <button
                  type="button"
                  class="text-white mr-5 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-xs rounded-lg text-xs px-5 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={updateEvent}
                >
                  Update
                </button>
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
                    <a href="#">Close modal</a>
                  </span>
                </button>
              </div>
            </div>
            <div className="p-4 h-96 overflow-y-auto">
              <div class="grid gap-4 sm:grid-cols-3 sm:gap-6 ">
                <div class="space-y-4 sm:col-span-2 sm:space-y-6">
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Event Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={updateEventData.event_name}
                      required=""
                      onChange={(e) =>
                        setUpdateEventData({
                          ...updateEventData,
                          event_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      for="description"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <div class="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                      <div class="px-4 py-3 bg-white rounded-b-lg dark:bg-gray-800">
                        <textarea
                          id="description"
                          rows="4"
                          class="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                          value={updateEventData.event_info}
                          required=""
                          onChange={(e) =>
                            setUpdateEventData({
                              ...updateEventData,
                              event_info: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      for="neue"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Venue
                    </label>
                    <input
                      type="text"
                      name="venue"
                      id="venue"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={updateEventData.venue}
                      required=""
                      onChange={(e) =>
                        setUpdateEventData({
                          ...updateEventData,
                          venue: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div class="flex items-center mb-4"></div>
                </div>
                <div class="space-y-4 sm:space-y-6">
                  <div>
                    <label
                      for="event-brand"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Payment
                    </label>
                    <input
                      type="number"
                      name="payment"
                      id="payment"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={updateEventData.payment}
                      onChange={(e) =>
                        setUpdateEventData({
                          ...updateEventData,
                          payment: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      for="event-brand"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Capacity
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      id="payment"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={capacityChange}
                      onChange={(e) =>
                        setCapacityChange(parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <label
                      for="category"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Date & time :
                      <span className="text-xs text-gray-500">
                        {" "}
                        {event.event_datetime}
                      </span>
                    </label>
                    <div className="flex w-full">
                      <div>
                        <DatePicker
                          selected={selectedDate}
                          className="w-44 rounded border border-gray-300 "
                          onChange={(date) => {
                            setSelectedDate(date);
                          }}
                        />
                      </div>
                      <div className="flex ml-2">
                        <input
                          type="number"
                          name="hour1"
                          id="hour1"
                          min={0}
                          max={23}
                          value={hours.hour1}
                          onChange={(e) => handleHourChange(e, "hour1")}
                          className="mr-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                          class="ml-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      for="item-weight"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Deadline :{" "}
                      <span className="text-xs text-gray-500">
                        {" "}
                        {event.payment_deadline}
                      </span>
                    </label>
                    <div className="flex w-full">
                      <div>
                        <DatePicker
                          selected={selectedDeadline}
                          className="w-44 rounded border border-gray-300"
                          onChange={(date) => {
                            setSelectedDeadline(date);
                          }}
                        />
                      </div>
                      <div className="flex ml-2">
                        <input
                          type="number"
                          name="hour2"
                          id="hour2"
                          value={hours.hour2}
                          onChange={(e) => handleHourChange(e, "hour2")}
                          className="mr-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                        <div className="text-3xl"> : </div>
                        <input
                          type="number"
                          name="mins2"
                          id="mins2"
                          value={mins.mins2}
                          onChange={(e) => handleMinChange(e, "mins2")}
                          class="ml-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default EditEventView;
