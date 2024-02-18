import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FetchCategories, UpdateProduct } from "../../api/ProductApi";
const EditProductView = ({ closeModal, product, reload }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
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
    console.log(product);
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
        console.log(response);
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

  const updateProductDetails = async () => {
    try {
      if (
        updateDetails.name !== "" &&
        updateDetails.description !== "" &&
        updateDetails.price !== 0 &&
        selectedCategory !== 0
        //AddProductDetails.subcategory_id !== 0
      ) {
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
          images: updateDetails.images,
          category_id: updateDetails.category_id,
          subcategory_id: updateDetails.subcategory_id,
        });

        if (response.status === 200) {
          toast.success("Details updated", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1200,
          });
          setTimeout(() => {
            closeModal();
            reload();
          }, 1500);
        }
      } else {
        toast.error("Required fields are empty", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid inputs. Please check", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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
                  class="text-white mr-5 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-xs rounded-lg text-xs px-5 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={updateProductDetails}
                >
                  Update
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
                      Product Images
                    </span>
                    <div class="grid grid-cols-3 gap-4 mb-4">
                      <div class="relative p-2 bg-gray-100 rounded-lg sm:w-36 sm:h-36 dark:bg-gray-700">
                        <img
                          src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-side-image.png"
                          alt="imac image"
                        />
                        <button
                          type="button"
                          class="absolute text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 bottom-1 left-1"
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
                      <div class="relative p-2 bg-gray-100 rounded-lg sm:w-36 sm:h-36 dark:bg-gray-700">
                        <img
                          src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png"
                          alt="imac image"
                        />
                        <button
                          type="button"
                          class="absolute text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 bottom-1 left-1"
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
                      <div class="relative p-2 bg-gray-100 rounded-lg sm:w-36 sm:h-36 dark:bg-gray-700">
                        <img
                          src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-back-image.png"
                          alt="imac image"
                        />
                        <button
                          type="button"
                          class="absolute text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 bottom-1 left-1"
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
                      <div class="relative p-2 bg-gray-100 rounded-lg sm:w-36 sm:h-36 dark:bg-gray-700">
                        <img
                          src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-side-image.png"
                          alt="imac image"
                        />
                        <button
                          type="button"
                          class="absolute text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 bottom-1 left-1"
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
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" />
                      </label>
                    </div>
                  </div>
                  <div class="flex items-center mb-4">
                    <input
                      id="product-options"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="product-options"
                      class="ml-2 text-sm text-gray-500 dark:text-gray-300"
                    >
                      Product has multiple options, like different colors or
                      sizes
                    </label>
                  </div>
                  <div class="relative">ddf</div>
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
                      for="breadth"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Color
                    </label>
                    <input
                      type="number"
                      name="breadth"
                      id="breadth"
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
                      for="width"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Size
                    </label>
                    <input
                      type="number"
                      name="width"
                      id="width"
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
