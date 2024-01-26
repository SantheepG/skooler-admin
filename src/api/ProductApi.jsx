import axios from "axios";

export const FetchProducts = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/products");
    return response;
  } catch (error) {
    return error;
  }
};

export const FetchCategories = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/categories");
    return response;
  } catch (error) {
    return error;
  }
};

export const AddProducts = async (data) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/addproduct",
      data,
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
export const AddCategory = async (category) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/category/add",
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
    const response = await axios.post(
      "http://127.0.0.1:8000/api/subcategory/add",
      data,
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
export const UpdateProduct = async () => {};
export const DeleteProduct = async (id) => {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/deleteproduct/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
