import axios from "axios";
import { base_URL } from "../App";

export const FetchHolidays = async () => {
  try {
    const response = await axios.get(`${base_URL}/holidays/fetch`, {
      headers: {
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const AddHoliday = async (data) => {
  try {
    const response = await axios.post(`${base_URL}/add/holiday`, data, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const DeleteHoliday = async (holidayId) => {
  try {
    const response = await axios.delete(
      `${base_URL}/holiday/delete/${holidayId}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "0",
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const FetchEvents = async () => {
  try {
    const response = await axios.get(`${base_URL}/events/fetch`, {
      headers: {
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const FetchUpcomingEvents = async () => {
  try {
    const response = await axios.get(`${base_URL}/upcoming/events/fetch`, {
      headers: {
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const FetchBookings = async () => {
  try {
    const response = await axios.get(`${base_URL}/fetch/bookings`, {
      headers: {
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const GetEvent = async (id) => {
  try {
    const response = await axios.get(`${base_URL}/event/get/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const AddEvent = async (data) => {
  try {
    const response = await axios.post(`${base_URL}/event/add`, data, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const UpdateEvent = async (data) => {
  try {
    const response = await axios.put(`${base_URL}/event/update`, data, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const DeleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${base_URL}/events/${id}/delete`, {
      headers: {
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const DeleteBooking = async (id) => {
  try {
    const response = await axios.delete(`${base_URL}/booking/delete/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const UpdateBookingStatus = async (data) => {
  try {
    const response = await axios.put(
      `${base_URL}/user/booking/statusupdate`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "0",
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
