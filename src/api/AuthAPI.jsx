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
export const UpdatePwd = async (data) => {
  try {
    const response = await axios.put(`${base_URL}/admin/reset/pwd`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tkn")}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const UpdateName = async (data) => {
  try {
    const response = await axios.put(`${base_URL}/admin/update/name`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tkn")}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
