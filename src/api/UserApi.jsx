import axios from "axios";
import { base_URL } from "../App";
export const FetchUsers = async () => {
  try {
    const response = await axios.get(`${base_URL}/fetchusers`, {
      headers: {
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const DeleteUser = async (id) => {
  try {
    const response = await axios.delete(`${base_URL}/admin/delete/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const ChangeStatus = async (data) => {
  try {
    const response = await axios.put(`${base_URL}/user/updatestatus`, data, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};
