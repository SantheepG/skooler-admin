import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddHoliday } from "../../api/EventApi";
import { holidaySchema } from "../../validations";
const AddHolidayView = ({ fetch, close }) => {
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateStr, setSelectedDateStr] = useState("");

  useEffect(() => {
    const formattedDate = (date) => {
      if (!date || isNaN(date.getTime())) {
        return "";
      }
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      console.log(`${year}-${month}-${day}`);
      return `${year}-${month}-${day}`;
    };
    setSelectedDateStr(formattedDate(selectedDate));
  }, [selectedDate]);

  const handleSubmit = async () => {
    try {
      await holidaySchema.validate(
        {
          name: name,
          date: selectedDateStr,
        },
        { abortEarly: false }
      );
      const response = await AddHoliday({ name: name, date: selectedDateStr });
      if (response.status === 201) {
        toast.success("Added", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1200,
        });
        fetch();
        setTimeout(() => {
          close();
        }, 1500);
      } else {
        toast.error("Something went wrong", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
      if (error.name === "ValidationError") {
        toast.error(error.errors[0], {
          position: "bottom-right",
        });
      } else {
        // Handle other errors
        toast.error("Something went wrong", {
          position: "bottom-right",
        });
      }
    }
  };
  return (
    <>
      <div class="my-4  bg-white max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
        <ToastContainer />
        <div class="flex flex-col border-b py-4 sm:flex-row sm:items-start">
          <div class="shrink-0 mr-auto sm:py-3">
            <p class="font-medium"> Add a holiday</p>
          </div>
          <button
            className="mr-2 hidden rounded-lg border-2 px-4 py-2 font-medium text-gray-500 sm:inline focus:outline-none focus:ring hover:bg-gray-200"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className="mr-2 hidden rounded-lg border-2 px-4 py-2 font-medium text-gray-500 sm:inline focus:outline-none focus:ring hover:bg-gray-200"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
        <div class="gap-4 border-b py-4 sm:flex-row">
          <p class="shrink-0 w-32 font-medium">
            Name<span className="required text-red-500"> *</span>
          </p>
          <input
            placeholder=""
            class="mb-2 lg:w-96 w-full mt-2 rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row mb-24">
          <p class="shrink-0 w-32 font-medium">
            Date<span className="required text-red-500"> *</span>
          </p>
          <DatePicker
            selected={selectedDate}
            className="md:w-24 lg:w-60 rounded border border-gray-300 "
            onChange={(date) => {
              setSelectedDate(date);
            }}
          />
        </div>

        <div class="flex justify-end py-4 sm:hidden">
          <button class="mr-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 focus:outline-none focus:ring hover:bg-gray-200">
            Cancel
          </button>
          <button class="rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </>
  );
};
export default AddHolidayView;
