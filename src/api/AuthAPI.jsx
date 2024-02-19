import axios from "axios";
import { base_URL } from "../App";

export const AdminLogin = async (data) => {
  try {
    const response = await axios.post(`${base_URL}/login/admin`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
export const Logout = async () => {
  try {
    const response = await axios.post(`${base_URL}/logout/admin`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tkn")}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
