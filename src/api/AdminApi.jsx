import axios from "axios";

export const FetchAdmins = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/fetchadmins");

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
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/admin/delete/${id}`
    );
    return response;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const ChangeStatus = async (id, isActive) => {
  try {
    const response = await axios.put(
      "http://127.0.0.1:8000/api/changeadminstatus",
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
      "http://127.0.0.1:8000/api/admin/roles/update",
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
