import axios from "axios";
import { base_URL } from "../App";

export const FetchComplaints = async () => {
  try {
    const response = await axios.get(`${base_URL}/complaints`);
    return response;
  } catch (error) {
    return error;
  }
};
export const FetchUserContact = async (id) => {
  try {
    const response = await axios.get(
      `${base_URL}/user/complaint/contact/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const UpdateStatus = async (id, status) => {
  try {
    const response = await axios.put(
      `${base_URL}/admin/complaint/update`,
      { id: id, status: status },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("error: ", error);
  }
};
