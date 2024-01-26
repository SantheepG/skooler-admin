import axios from "axios";

export const FetchUserContact = async (id) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/user/complaint/contact/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const UpdateStatus = async (id, status) => {
  try {
    const response = await axios.put(
      "http://127.0.0.1:8000/api/admin/complaint/update",
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
