import axios from "axios";

export const FetchUsers = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/fetchadmins");

    return response;
  } catch (error) {
    return error;
  }
};

export const DeleteUser = async (id) => {
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
