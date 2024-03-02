import axios from "axios";
import { base_URL } from "../App";

export const FetchEvents = async () => {
  try {
    const response = await axios.get(`${base_URL}/events/fetch`);
    return response;
  } catch (error) {
    return error;
  }
};
export const FetchUpcomingEvents = async () => {
  try {
    const response = await axios.get(`${base_URL}/upcoming/events/fetch`);
    return response;
  } catch (error) {
    return error;
  }
};
export const FetchBookings = async () => {
  try {
    const response = await axios.get(`${base_URL}/fetch/bookings`);
    return response;
  } catch (error) {
    return error;
  }
};
export const GetEvent = async (id) => {
  try {
    const response = await axios.get(`${base_URL}/event/get/${id}`);
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
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const DeleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${base_URL}/events/${id}/delete`);
    return response;
  } catch (error) {
    return error;
  }
};
export const DeleteBooking = async (id) => {
  try {
    const response = await axios.delete(`${base_URL}/booking/delete/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
