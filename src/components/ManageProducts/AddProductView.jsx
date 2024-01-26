import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { AddProducts } from "../../api/ProductApi";
import "react-toastify/dist/ReactToastify.css";
const AddProductView = ({
  products,
  category,
  subcategory,
  closeModal,
  reload,
}) => {
  const [viewSubcategory, setViewSubcategory] = useState(false);
  const [viewDiscount, setViewDiscount] = useState(false);
  const [viewColor, setViewColor] = useState(false);
  const [viewSize, setViewSize] = useState(false);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedCategoryID, setSelectedCategoryID] = useState(0);
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);
  const [selectedSubcategoryID, setSelectedSubcategoryID] = useState(0);
  const [subcategoriesDisabled, setSubcategoriesDisabled] = useState(true);
  const [AddProductDetails, setAddProductDetails] = useState({
    name: "",
    description: "",
    stock: null,
    size: null,
    color: null,
    price: 0,
    discount: 0,
    discounted_price: 0,
    images: null,
    category_id: 0,
    subcategory_id: 0,
  });

  const resetStates = () => {
    setSelectedCategory(0);
    setSelectedSubcategory(0);
    setAddProductDetails({
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
  };

  const handleCategoryChange = (event) => {
    //setAllProducts(fetchedProducts);
    setFilteredSubcategories([]);

    const selectedCat = category.filter(
      (item) => item.id === parseInt(event.target.value)
    );
    setAddProductDetails({
      ...AddProductDetails,
      category_id: parseInt(event.target.value),
    });
    setSelectedCategory(selectedCat[0]);
    setSelectedCategoryID(selectedCat[0].id);

    const filteredData = subcategory.filter(
      (item) => item.category_id === parseInt(selectedCat[0].id)
    );

    if (filteredData.length === 0) {
      setSubcategoriesDisabled(true);
      setFilteredSubcategories([]);
    } else {
      setFilteredSubcategories(filteredData);
    }
  };

  const handleSubCategoryChange = (event) => {
    const selectedValue = parseInt(event.target.value);
    setSelectedSubcategory(selectedValue);
    console.log(selectedValue);
    setAddProductDetails({
      ...AddProductDetails,
      subcategory_id: selectedValue,
    });
    //setSelectedSubcategory("");
  };

  const addProduct = async () => {
    try {
      if (
        AddProductDetails.name !== "" &&
        AddProductDetails.description !== "" &&
        AddProductDetails.price !== 0 &&
        AddProductDetails.stock !== null &&
        selectedCategory.length !== 0
      ) {
        const filterProducts = products.filter(
          (item) =>
            item.name.toLowerCase() === AddProductDetails.name.toLowerCase() &&
            item.size === AddProductDetails.size &&
            item.color === AddProductDetails.color
        );

        if (filterProducts.length === 0) {
          let data = {
            name: AddProductDetails.name,
            description: AddProductDetails.description,
            stock: parseInt(AddProductDetails.stock),
            size: AddProductDetails.size === "" ? null : AddProductDetails.size,
            color:
              AddProductDetails.color === "" ? null : AddProductDetails.color,
            price: parseFloat(AddProductDetails.price),
            discount:
              AddProductDetails.discount === 0
                ? null
                : parseFloat(AddProductDetails.discount),
            discounted_price:
              AddProductDetails.discount === 0
                ? null
                : parseFloat(
                    AddProductDetails.price -
                      AddProductDetails.price *
                        (AddProductDetails.discount / 100)
                  ),
            images: AddProductDetails.images,
            category_id: parseInt(selectedCategoryID),
            subcategory_id: parseInt(selectedSubcategory),
          };

          const response = await AddProducts(data);

          if (response.status === 201) {
            toast.success("Added", {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 1200,
            });
            setTimeout(() => {
              closeModal();
              reload();
            }, 1500);
          } else {
            toast.error("Something went wrong", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        } else {
          toast.error("Product already exists", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } else {
        console.error(AddProductDetails, selectedCategory);

        toast.error("Required fields are empty", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      toast.error("Invalid inputs. Please check", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <React.Fragment>
      <div
        id="createProductModal"
        tabindex="-1"
        aria-hidden="true"
        class="ml-96 h-56 overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full"
      >
        <div className="fixed">
          <ToastContainer />
        </div>
        <div class="relative p-4 w-full max-w-3xl h-full md:h-auto">
          <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Add Product
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="createProductModal"
                onClick={() => {
                  resetStates();
                  closeModal();
                }}
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
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <form action="#">
              <div class="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required=""
                    onChange={(e) =>
                      setAddProductDetails({
                        ...AddProductDetails,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    for="category"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="category"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={(e) => handleCategoryChange(e)}
                  >
                    <option value="" disabled selected>
                      Choose Category
                    </option>

                    {category.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    for="price"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    min={0}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={(e) =>
                      setAddProductDetails({
                        ...AddProductDetails,
                        price: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <div className="flex">
                    <label
                      for="brand"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Subcategory{" "}
                    </label>
                    <span
                      className="p-1 ml-2 hover:text-green-600 cursor-pointer"
                      onClick={() => setViewSubcategory(!viewSubcategory)}
                    >
                      <IoIosAddCircleOutline />
                    </span>
                  </div>

                  <div className="border rounded-lg">
                    {viewSubcategory && (
                      <select
                        id="category"
                        className="bg-gray-50 Slidedown border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        onChange={(e) => handleSubCategoryChange(e)}
                      >
                        <option value="" disabled selected>
                          Choose Subcategory
                        </option>
                        {filteredSubcategories.map((subcategory) => (
                          <option key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                <div class="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-4">
                  <div>
                    <label
                      for="width"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Stock qty <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      name="width"
                      id="width"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      min={0}
                      onChange={(e) =>
                        setAddProductDetails({
                          ...AddProductDetails,
                          stock: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <div className="flex">
                      <label
                        for="weight"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        onClick={() => setViewDiscount(!viewDiscount)}
                      >
                        Discount %
                      </label>
                      <span
                        className="p-1 ml-2 hover:text-green-600 cursor-pointer"
                        onClick={() => setViewDiscount(!viewDiscount)}
                      >
                        <IoIosAddCircleOutline />
                      </span>
                    </div>

                    <div className="border rounded-lg">
                      {viewDiscount && (
                        <input
                          type="number"
                          name="weight"
                          id="weight"
                          class="Slidedown bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          min={0}
                          onChange={(e) =>
                            setAddProductDetails({
                              ...AddProductDetails,
                              discount: parseFloat(e.target.value),
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex">
                      <label
                        for="length"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Color
                      </label>
                      <span
                        className="p-1 ml-2 hover:text-green-600 cursor-pointer"
                        onClick={() => setViewColor(!viewColor)}
                      >
                        <IoIosAddCircleOutline />
                      </span>
                    </div>
                    <div className="border rounded-lg">
                      {viewColor && (
                        <input
                          type="text"
                          name="length"
                          id="length"
                          class="bg-gray-50 border Slidedown border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          onChange={(e) =>
                            setAddProductDetails({
                              ...AddProductDetails,
                              color: e.target.value,
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex">
                      <label
                        for="breadth"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Size
                      </label>
                      <span
                        className="p-1 ml-2 hover:text-green-600 cursor-pointer"
                        onClick={() => setViewSize(!viewSize)}
                      >
                        <IoIosAddCircleOutline />
                      </span>
                    </div>
                    <div className="border rounded-lg">
                      {viewSize && (
                        <input
                          type="text"
                          name="breadth"
                          id="breadth"
                          class="bg-gray-50 Slidedown border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          min={0}
                          onChange={(e) =>
                            setAddProductDetails({
                              ...AddProductDetails,
                              size: e.target.value,
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write product description here"
                    onChange={(e) =>
                      setAddProductDetails({
                        ...AddProductDetails,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>
              <div class="mb-4 space-y-4 sm:flex sm:space-y-0"></div>
              <div class="mb-4">
                <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Product Images
                </span>
                <div class="flex justify-center items-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col justify-center items-center w-full h-48 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div class="flex flex-col justify-center items-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        class="mb-3 w-10 h-10 text-gray-400"
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
              <div class="ml-56 items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  class="w-full sm:w-auto justify-center text-white inline-flex bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={addProduct}
                >
                  Add product
                </button>

                <button
                  data-modal-toggle="createProductModal"
                  type="button"
                  class="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => {
                    resetStates();
                    closeModal();
                  }}
                >
                  <svg
                    class="mr-1 -ml-1 w-5 h-5"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AddProductView;
