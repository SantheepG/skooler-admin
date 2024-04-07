import axios from "axios";
import { base_URL } from "../App";

export const AdminLogin = async (data) => {
  try {
    const response = await axios.post(`${base_URL}/login/admin`, data, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
export const FetchAdmin = async () => {
  try {
    let tkn = localStorage.getItem("tkn");
    const response = await axios.get(`${base_URL}/admin`, {
      headers: {
        Authorization: `Bearer ${tkn}`,
        "ngrok-skip-browser-warning": "0",
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};
export const Logout = async () => {
  try {
    const response = await axios.post(`${base_URL}/logout/admin`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tkn")}`,
        "ngrok-skip-browser-warning": "0",
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
        "ngrok-skip-browser-warning": "0",
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
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
export const VerifyAdminPhone = async (phoneNo) => {
  try {
    const response = await axios.post(
      `${base_URL}/admin/phone/reset`,
      { mobile_no: phoneNo },
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
export const RecoverAccount = async (phoneNo, pwd) => {
  try {
    const response = await axios.post(
      `${base_URL}/admin/account/recover`,
      { mobile_no: phoneNo, pwd: pwd },
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
export const CheckOtp = async (phoneNo, otp) => {
  try {
    const response = await axios.post(
      `${base_URL}/admin/phone/otp/check`,
      { mobile_no: phoneNo, otp: otp },
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
