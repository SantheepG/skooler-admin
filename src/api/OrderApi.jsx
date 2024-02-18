import axios from "axios";
import { base_URL } from "../App";

export const FetchOrders = async () => {
  try {
    const response = await axios.get(`${base_URL}/admin/orders`);
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
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = async (id) => {
  try {
    const response = await axios.delete(`${base_URL}/admin/order/delete/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
