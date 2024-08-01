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
      `${base_URL}/user/complaint/contact/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const UpdateStatus = async (userID, id, status) => {
  try {
    const response = await axios.put(
      `${base_URL}/admin/complaint/update`,
      { user_id: userID, id: id, status: status },
      {
        headers: {
          "Content-Type": "application/json"
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("error: ", error);
  }
};

export const DeleteComplaint = async (id) => {
  try {
    const response = await axios.delete(`${base_URL}/complaint/delete/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
