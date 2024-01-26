import axios from "axios";

export const FetchOrders = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/admin/orders");
    return response;
  } catch (error) {
    return error;
  }
};

export const UpdateOrder = async (data) => {
  try {
    const response = await axios.put(
      "http://127.0.0.1:8000/api/admin/order/update",
      data,
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

export const deleteOrder = async (id) => {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/admin/order/delete/${id}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
