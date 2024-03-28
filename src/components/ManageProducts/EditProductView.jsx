import React, { useState, useEffect } from "react";
import { s3base_URL, imgFormats } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import { UpdateProductImgs } from "../../api/ProductApi";
import "react-toastify/dist/ReactToastify.css";
import {
  DeleteProductImg,
  FetchCategories,
  UpdateProduct,
} from "../../api/ProductApi";

const EditProductView = ({ closeModal, product, reload }) => {
  const [imgs, setImgs] = useState([]);
  const [imgsToUpload, setImgsToUpload] = useState([]);
  const [newlyAddedImgs, setNewlyAddedImgs] = useState([]);
  const [updateProductClicked, setUpdateProductClicked] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imgToDelete, setImgToDelete] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [subcategoriesDisabled, setSubcategoriesDisabled] = useState(true);
  const [updateDetails, setUpdateDetails] = useState({
    name: "",
    description: "",
    stock: 0,
    size: null,
    color: null,
    price: 0,
    discount: 0,
    discounted_price: 0,
    images: null,
    category_id: 0,
    subcategory_id: 0,
  });

  useEffect(() => {
    if (product.images) {
      setImgs(JSON.parse(product.images));
    }
    setUpdateDetails(product);
  }, [product]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await FetchCategories();
        if (response && response.data) {
          const { category, subcategory } = response.data;
          setCategories(category);
          setSubcategories(subcategory);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (event) => {
    const selectedValue = parseInt(event.target.value);
    setUpdateDetails({
      ...updateDetails,
      category_id: selectedValue,
    });
    setSelectedCategory(selectedValue);

    if (selectedValue === "") {
      setSubcategoriesDisabled(true);
      setSelectedSubcategories([]);
    } else {
      let subcats = subcategories.filter(
        (item) => item.category_id === selectedValue
      );

      setSelectedSubcategories(subcats);
    }
  };

  const handleSubCategoryChange = async (event) => {
    const selectedValue = parseInt(event.target.value);
    setSelectedSubcategory(selectedValue);
    setUpdateDetails({
      ...updateDetails,
      subcategory_id: selectedValue,
    });
  };
  const handleAddImage = (e) => {
    try {
      const files = e.target.files;
      const fileCount = files.length;
      let invalidImgs = 0;
      for (let i = 0; i < fileCount; i++) {
        const fileExtension = files[i].name.split(".").pop().toLowerCase();
        console.log(fileExtension);
        if (!imgFormats.includes(fileExtension)) {
          invalidImgs++;
          break;
        }
      }
      if (files.length > 0 && invalidImgs === 0) {
        setImgsToUpload((prevImages) => [...prevImages, ...files]);
        // Convert each selected file to a data URL
        const newImages = Array.from(files).map((file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result);
            };
            reader.readAsDataURL(file);
          });
        });

        // Once all promises are resolved, update the state with the new images
        Promise.all(newImages).then((imageArray) => {
          setNewlyAddedImgs((prevImages) => [...prevImages, ...imageArray]);
        });
      } else {
        toast.error("Invalid image format", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid image", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  const handleImgDelete = (index) => {
    const updatedArr1 = [...newlyAddedImgs];
    const updatedArr2 = [...imgsToUpload];
    updatedArr1.splice(index, 1);
    updatedArr2.splice(index, 1);
    setNewlyAddedImgs(updatedArr1);
    setImgsToUpload(updatedArr2);
  };
  const handleUpdateProductImgs = async () => {
    setUpdateProductClicked(true);
    try {
      if (
        updateDetails.name !== "" &&
        updateDetails.description !== "" &&
        updateDetails.price !== 0 &&
        selectedCategory !== 0
      ) {
        if (imgsToUpload.length !== 0) {
          const formData = new FormData();
          formData.append("id", product.id);
          imgsToUpload.forEach((image) => {
            formData.append("imgs[]", image);
          });
          const response = await UpdateProductImgs(formData);
          if (response.status === 201) {
            updateProductDetails(response.data.paths);
          } else {
            console.log(response);
            toast.error("Something went wrong. Please try again", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            setUpdateProductClicked(false);
          }
        } else {
          updateProductDetails(imgs);
        }
      } else {
        toast.error("Required fields are empty", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setUpdateProductClicked(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid inputs. Please check", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  const updateProductDetails = async (Images) => {
    try {
      const response = await UpdateProduct({
        id: product.id,
        name: updateDetails.name,
        description: updateDetails.description,
        stock: parseFloat(updateDetails.stock),
        size: updateDetails.size,
        color: updateDetails.color,
        price: parseFloat(updateDetails.price),
        discount:
          updateDetails.discount === 0
            ? null
            : parseFloat(updateDetails.discount),
        discounted_price:
          updateDetails.discount === 0
            ? null
            : parseFloat(
                updateDetails.price -
                  updateDetails.price * (updateDetails.discount / 100)
              ),
        images: JSON.stringify(Images),
        category_id: updateDetails.category_id,
        subcategory_id: updateDetails.subcategory_id,
      });

      if (response.status === 200) {
        toast.success("Details updated", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1200,
        });
        setUpdateProductClicked(false);
        setTimeout(() => {
          closeModal();
          reload();
        }, 1500);
      } else {
        toast.error("Invalid inputs. Please check", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setUpdateProductClicked(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid inputs. Please check", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleProductImgDelete = async (index) => {
    try {
      if (imgs.length > 1) {
        const response = await DeleteProductImg({
          id: product.id,
          path: imgs[index],
        });
        if (response.status === 200) {
          reload();
          setImgs(JSON.parse(response.data.images));
          //setImgs((prevImages) => prevImages.filter((_, i) => i !== index));
        } else {
          console.log(response.message);
          toast.error("Something went wrong. Please try again", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } else {
        toast.error("Thumbnail image cannot be deleted.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      {product ? (
        <div class="relative w-full max-w-5xl max-h-full">
          <div className="fixed">
            <ToastContainer />
          </div>
          <form class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Product
                <div className="text-xs text-gray-500">
                  Product ID : #{product.id}
                </div>
              </h3>

              <div>
                <button
                  type="button"
                  class="py-2 px-8 me-2 mr-8 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:outline-none focus:ring-gray-700 focus:text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                  onClick={handleUpdateProductImgs}
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className={`${
                      updateProductClicked ? "inline" : "hidden"
                    } w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600`}
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                  {updateProductClicked ? "Please wait" : "Update"}
                </button>

                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="editUserModal"
                  onClick={() => closeModal()}
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">
                    <a href="#">Close modal</a>
                  </span>
                </button>
              </div>
            </div>
            <div className="p-4 h-96 overflow-y-auto">
              <div class="grid gap-4 sm:grid-cols-3 sm:gap-6 ">
                <div class="space-y-4 sm:col-span-2 sm:space-y-6">
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={updateDetails.name}
                      required=""
                      onChange={(e) =>
                        setUpdateDetails({
                          ...updateDetails,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      for="description"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <div class="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                      <div class="px-4 py-3 bg-white rounded-b-lg dark:bg-gray-800">
                        <textarea
                          id="description"
                          rows="4"
                          class="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                          value={updateDetails.description}
                          onChange={(e) =>
                            setUpdateDetails({
                              ...updateDetails,
                              description: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="mb-4">
                    <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Product Images (First image will be the thumbnail image)
                    </span>
                    <div class="grid grid-cols-3 gap-4 mb-4">
                      {imgs.length !== 0 &&
                        imgs.map((img, index) => (
                          <div
                            key={index}
                            class="relative rounded-lg sm:w-36 sm:h-36 dark:bg-gray-700"
                          >
                            <img
                              key={index}
                              src={`${s3base_URL}${img}`}
                              alt="product"
                              className="max-w-36 max-h-36"
                            />
                            <div className="flex">
                              <button
                                type="button"
                                class="absolute text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 bottom-1 left-1"
                                onClick={() => setImgToDelete(index)}
                              >
                                <svg
                                  aria-hidden="true"
                                  class="w-5 h-5"
                                  fill="currentColor"
                                  viewbox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                                <span class="sr-only">Remove image</span>
                              </button>
                              {imgToDelete !== null &&
                                imgToDelete === index && (
                                  <p
                                    class="absolute text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 bottom-1 left-1 ml-6 text-xs border rounded-xl px-2 cursor-pointer hover:red-800"
                                    onClick={() =>
                                      handleProductImgDelete(index)
                                    }
                                  >
                                    Delete
                                  </p>
                                )}
                            </div>
                          </div>
                        ))}
                    </div>
                    <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Newly added images
                    </span>
                    <div class="grid grid-cols-3 gap-4 mb-4">
                      {newlyAddedImgs.length !== 0 &&
                        newlyAddedImgs.map((img, index) => (
                          <div
                            key={index}
                            class="relative rounded-lg sm:w-36 sm:h-36 dark:bg-gray-700"
                          >
                            <img
                              src={img}
                              alt="product"
                              className="max-w-36 max-h-36"
                            />
                            <button
                              type="button"
                              class="absolute text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 bottom-1 left-1"
                              onClick={() => handleImgDelete(index)}
                            >
                              <svg
                                aria-hidden="true"
                                class="w-5 h-5"
                                fill="currentColor"
                                viewbox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              <span class="sr-only">Remove image</span>
                            </button>
                          </div>
                        ))}
                    </div>

                    <div class="flex items-center justify-center w-full">
                      <label
                        for="dropzone-file"
                        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            class="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewbox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click to upload</span>
                            or drag and drop
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          class="hidden"
                          onChange={handleAddImage}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="space-y-4 sm:space-y-6">
                  <div>
                    <label
                      for="product-brand"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      onChange={handleCategoryChange}
                    >
                      <option value="" disabled selected>
                        Choose Category
                      </option>

                      {categories.map((category) => (
                        <option
                          key={category.id}
                          value={category.id}
                          selected={updateDetails.category_id === category.id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      for="category"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Subcategory
                    </label>
                    <select
                      id="category"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      onChange={handleSubCategoryChange}
                    >
                      <option value="" disabled selected>
                        Choose Subcategory
                      </option>
                      {selectedSubcategories.length !== 0 &&
                        selectedSubcategories.map((subcategory) => (
                          <option
                            key={subcategory.id}
                            value={subcategory.id}
                            selected={
                              updateDetails.subcategory_id === subcategory.id
                            }
                          >
                            {subcategory.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label
                      for="item-weight"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="item-weight"
                      id="item-weight"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={updateDetails.price}
                      required=""
                      onChange={(e) =>
                        setUpdateDetails({
                          ...updateDetails,
                          price: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      for="item-stock"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Stock Qty
                    </label>
                    <input
                      type="number"
                      name="item-stock"
                      id="item-stock"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={updateDetails.stock}
                      required=""
                      min={0}
                      onChange={(e) =>
                        setUpdateDetails({
                          ...updateDetails,
                          stock: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      for="length"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Discount %
                    </label>
                    <input
                      type="number"
                      name="length"
                      id="lenght"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={updateDetails.discount}
                      required=""
                      min={0}
                      onChange={(e) =>
                        setUpdateDetails({
                          ...updateDetails,
                          discount: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      for="color"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Color
                    </label>
                    <input
                      type="text"
                      name="color"
                      id="color"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={updateDetails.color}
                      required=""
                      onChange={(e) =>
                        setUpdateDetails({
                          ...updateDetails,
                          color: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      for="size"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Size
                    </label>
                    <input
                      type="text"
                      name="size"
                      id="size"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={updateDetails.size}
                      required=""
                      onChange={(e) =>
                        setUpdateDetails({
                          ...updateDetails,
                          size: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default EditProductView;
