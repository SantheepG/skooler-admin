import axios from "axios";
import { base_URL } from "../App";

export const FetchProducts = async () => {
  try {
    const response = await axios.get(`${base_URL}/products`);
    return response;
  } catch (error) {
    return error;
  }
};

export const FetchCategories = async () => {
  try {
    const response = await axios.get(`${base_URL}/categories `);
    return response;
  } catch (error) {
    return error;
  }
};

export const AddProducts = async (data) => {
  try {
    const response = await axios.post(`${base_URL}/addproduct`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const AddCategory = async (category) => {
  try {
    const response = await axios.post(
      `${base_URL}/category/add`,
      {
        name: category,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const AddSubcategory = async (data) => {
  try {
    const response = await axios.post(`${base_URL}/subcategory/add`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const UpdateProduct = async (data) => {
  try {
    const response = await axios.put(`${base_URL}/product/update`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const DeleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${base_URL}/deleteproduct/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
export const UpdateStock = async (id, stockChange) => {
  try {
    const response = await axios.put(`${base_URL}/stock/${id}/${stockChange}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const AddProductImgs = async (formData) => {
  try {
    const response = await axios.post(
      `${base_URL}/product/imgs/add`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const DeleteProductImg = async (data) => {
  try {
    const response = await axios.put(`${base_URL}/product/img/delete`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
