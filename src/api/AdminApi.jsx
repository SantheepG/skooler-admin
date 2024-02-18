import axios from "axios";
import { base_URL } from "../App";
export const FetchAdmins = async () => {
  try {
    const response = await axios.get(`${base_URL}/fetchadmins`);

    return response;
  } catch (error) {
    return error;
  }
};

export const AddAdmin = async (data) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/adminsignup",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

export const DeleteAdmin = async (id) => {
  try {
    const response = await axios.delete(`${base_URL}/admin/delete/${id}`);
    return response;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const ChangeStatus = async (id, isActive) => {
  try {
    const response = await axios.put(
      `${base_URL}/changeadminstatus`,
      { id: id, isActive: isActive },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const UpdateRoles = async (id, roles) => {
  try {
    const response = await axios.put(
      `${base_URL}/admin/roles/update`,
      {
        id: id,
        roles: roles,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
