import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { AddProductImgs, AddProducts } from "../../api/ProductApi";
import { imgFormats } from "../../App";
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
  const [subcategoriesDisabled, setSubcategoriesDisabled] = useState(true);
  const [images, setImages] = useState([]);
  const [imgsToUpload, setImgsToUpload] = useState([]);
  const [addProductClicked, setAddProductClicked] = useState(false);
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

  const checkProductAvailability = (productName, productSize, productColor) => {
    const filterProducts = products.filter(
      (item) =>
        item.name.toLowerCase() === productName.toLowerCase() &&
        item.size === productSize &&
        item.color.toLowerCase() === productColor.toLowerCase()
    );
    return filterProducts.length === 0 ? true : false;
  };
  const uploadImgs = async () => {
    setAddProductClicked(true);
    try {
      if (
        AddProductDetails.name !== "" &&
        AddProductDetails.description !== "" &&
        AddProductDetails.price !== 0 &&
        AddProductDetails.stock !== null &&
        selectedCategory.length !== 0
      ) {
        if (
          checkProductAvailability(
            AddProductDetails.name,
            AddProductDetails.size,
            AddProductDetails.color
          )
        ) {
          if (imgsToUpload.length > 0) {
            const formData = new FormData();
            imgsToUpload.forEach((image) => {
              formData.append("imgs[]", image);
            });

            const response = await AddProductImgs(formData);
            if (response.status === 201) {
              addANewProduct(response.data.paths);
            } else {
              console.log(response);
              toast.error("Something went wrong. Please try again", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
              setAddProductClicked(false);
            }
          } else {
            toast.error("Add images to continue", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            setAddProductClicked(false);
          }
        } else {
          toast.error("Product already exists.", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setAddProductClicked(false);
        }
      } else {
        toast.error("Required fields are empty", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setAddProductClicked(false);
      }
    } catch (error) {
      console.log(error);
      setAddProductClicked(false);
    }
  };

  const addANewProduct = async (paths) => {
    try {
      if (paths) {
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
                    AddProductDetails.price * (AddProductDetails.discount / 100)
                ),
          images: JSON.stringify(paths),
          thumbnail: paths[0],
          category_id: parseInt(selectedCategoryID),
          subcategory_id: parseInt(selectedSubcategory),
          imgPaths: JSON.stringify(paths),
        };
        const response = await AddProducts(data);
        if (response.status === 201) {
          toast.success("Added", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1200,
          });
          setAddProductClicked(false);
          setTimeout(() => {
            closeModal();
            reload();
          }, 1500);
        } else {
          toast.error("Something went wrong", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setAddProductClicked(false);
        }
      }
    } catch (error) {
      console.log(error);
      setAddProductClicked(false);
    }
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
          setImages((prevImages) => [...prevImages, ...imageArray]);
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
    const updatedArr1 = [...images];
    const updatedArr2 = [...imgsToUpload];
    updatedArr1.splice(index, 1);
    updatedArr2.splice(index, 1);
    setImages(updatedArr1);
    setImgsToUpload(updatedArr2);
  };

  return (
    <React.Fragment>
      <div
        id="createProductModal"
        tabindex="-1"
        aria-hidden="true"
        class="md:ml-56 lg:ml-96 h-56 overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full"
      >
        <ToastContainer />

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
                        for="color"
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
                          name="color"
                          id="color"
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
                <span class="block  mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Product Images{" "}
                  <span class="text-xs text-blue-800 dark:text-blue-600">
                    ( Add thumbnail image first )
                  </span>
                </span>
                <div class="grid grid-cols-3 gap-3 mb-4">
                  {images.length !== 0 &&
                    images.map((img, index) => (
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
              </div>
              <div class="mb-4">
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
                        <span class="font-semibold">Click to upload </span>
                        or drag and drop
                      </p>
                      <p class="text-xs text-blue-500 dark:text-blue-600">
                        Add thumbnail image first
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
              <div class="flex items-center justify-center w-full space-x-2">
                <button
                  data-modal-toggle="createProductModal"
                  type="button"
                  class="justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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
                <button
                  type="button"
                  class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:outline-none focus:ring-gray-700 focus:text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                  onClick={uploadImgs}
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className={`${
                      addProductClicked ? "inline" : "hidden"
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
                  {addProductClicked ? "Please wait" : "Add product"}
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
