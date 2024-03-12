import axios from "axios";
import { base_URL } from "../App";

export const FetchOrders = async () => {
  try {
    const response = await axios.get(`${base_URL}/admin/orders`, {
      headers: {
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const UpdateOrder = async (data) => {
  try {
    const response = await axios.put(`${base_URL}/admin/order/update`, data, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteOrder = async (id) => {
  try {
    const response = await axios.delete(
      `${base_URL}/admin/order/delete/${id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "0",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
