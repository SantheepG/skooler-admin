import React, { useState, useEffect } from "react";
import ProductRow from "./ProductRow";
import ProductPreview from "./ProductPreview";
import EditProductView from "./EditProductView";
import AddProductView from "./AddProductView";
import UpdateStockView from "../ManageStock/UpdateStockView";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AccessDenied from "../AccessDenied";
import { FaPlus } from "react-icons/fa6";
import AddCatView from "./AddCatView";
import AddSubCatView from "./AddSubCatView";
import {
  DeleteProduct,
  FetchCategories,
  FetchProducts,
} from "../../api/ProductApi";
const ManageProducts = ({ bool }) => {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [productsToview, setProductsToView] = useState([]);
  const [overlayClicked, setOverlayClicked] = useState(false);
  const [addProductClicked, setAddProductClicked] = useState(false);
  const [editProductClicked, setEditProductClicked] = useState(false);
  const [previewProductClicked, setpreviewProductClicked] = useState(false);
  const [deleteProductClicked, setdeleteProductClicked] = useState(false);
  const [addCatViewClicked, setAddCatViewClicked] = useState(false);
  const [addSubCatViewClicked, setAddSubCatViewClicked] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [reloadComponent, setReloadComponent] = useState(false);
  const [updateStockClicked, setUpdateStockClicked] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

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

    const fetchProducts = async () => {
      try {
        const response = await FetchProducts();
        if (response) {
          setFetchedProducts(response.data.products);
          setProductsToView(response.data.products);
          setReloadComponent(false);
        }
      } catch (error) {
        console.log("Error Fetching products", error);
        setReloadComponent(false);
      }
    };

    fetchProducts();
  }, [reloadComponent]);

  const toggleDropdown = (adminId) => {
    setOpenDropdown((prevOpenDropdown) =>
      prevOpenDropdown === adminId ? null : adminId
    );
  };

  const searchProduct = (event) => {
    event.preventDefault();
    const inputValue = event.target.value.toLowerCase();

    if (inputValue === "") {
      setProductsToView(fetchedProducts);
    } else {
      let matchedProducts = fetchedProducts.filter(
        (item) =>
          item.name.toLowerCase().includes(inputValue) ||
          item.id === parseInt(inputValue)
      );
      setProductsToView(matchedProducts);
    }
  };

  const filterProduct = (event) => {
    event.preventDefault();
    const inputValue = event.target.value.toLowerCase();

    if (event.target.value === "All") {
      setProductsToView(fetchedProducts);
    } else if (event.target.value === "Out of stock") {
      let matchedProducts = fetchedProducts.filter((item) => item.stock === 0);
      setProductsToView(matchedProducts);
    } else if (event.target.value === "Newly added") {
      //descending order of created_at
      let sortedProducts = [...fetchedProducts].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setProductsToView(sortedProducts);
    } else if (event.target.value === "Old") {
      //ascending order of created_at
      let sortedProducts = [...fetchedProducts].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setProductsToView(sortedProducts);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await DeleteProduct(id);
      if (response) {
        toast.success("Deleted", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1200,
        });
        setTimeout(() => {
          setReloadComponent(true);
          setOverlayClicked(!overlayClicked);
          setdeleteProductClicked(!deleteProductClicked);
        }, 1500);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      {bool ? (
        <div className="viewContent relative m-5 mb-15 ">
          <div className="fixed">
            <ToastContainer />
          </div>
          <div class="relative shadow-md sm:rounded-lg admin-table">
            <div
              class={`flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900 ${
                overlayClicked ? "opacity-40" : ""
              }`}
            >
              <label for="table-search" class="sr-only">
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  class="block ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for products"
                  onChange={(e) => searchProduct(e)}
                />
              </div>

              <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  type="button"
                  id="createProductButton"
                  data-modal-toggle="createProductModal"
                  class="flex items-center justify-center text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  onClick={() => {
                    setAddProductClicked(!addProductClicked);
                    setOverlayClicked(!overlayClicked);
                  }}
                >
                  Add product
                </button>
                <div class="flex mt-4 md:mt-6">
                  <a
                    href="#"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
                    onClick={() => {
                      setAddCatViewClicked(!addCatViewClicked);
                      setOverlayClicked(!overlayClicked);
                    }}
                  >
                    <span className="mr-2">
                      <FaPlus />
                    </span>
                    <span>Category</span>
                  </a>
                  <a
                    href="#"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
                    onClick={() => {
                      setAddSubCatViewClicked(!addSubCatViewClicked);
                      setOverlayClicked(!overlayClicked);
                    }}
                  >
                    <span className="mr-2">
                      <FaPlus />
                    </span>
                    <span>Subcategory</span>
                  </a>
                </div>
                <select
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={(e) => filterProduct(e)}
                >
                  <option name={"All"} value={"All"}>
                    All
                  </option>
                  <option name={"Newly added"} value={"Newly added"}>
                    Newly added
                  </option>
                  <option name={"Out of stock"} value={"Out of stock"}>
                    Out of stock
                  </option>
                  <option name={"Old"} value={"Old"}>
                    Earliest
                  </option>
                </select>
              </div>
            </div>
            <table
              className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ${
                overlayClicked ? "opacity-40" : ""
              }`}
            >
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="p-4 p">
                    # ID
                  </th>
                  <th scope="col" class="p-4">
                    Product
                  </th>
                  <th scope="col" class="p-2 px-6">
                    Price
                  </th>
                  <th scope="col" class="p-2 px-6">
                    Discount
                  </th>
                  <th scope="col" class="p-2">
                    Category
                  </th>
                  <th scope="col" class="p-2">
                    Subcategory
                  </th>
                  <th scope="col" class="p-2">
                    Stock
                  </th>

                  <th scope="col" class="p-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {productsToview.length !== 0 ? (
                  productsToview.map((product, index) => (
                    <tr class="bg-white border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <ProductRow
                        key={index}
                        product={product}
                        categories={categories}
                        subcategories={subcategories}
                        openDropdown={openDropdown}
                        toggleDropdown={() => toggleDropdown(product.id)}
                        updateStock={() => {
                          setOverlayClicked(!overlayClicked);
                          setUpdateStockClicked(!updateStockClicked);
                          setCurrentProductIndex(index);
                          setCurrentProduct(product);
                        }}
                        previewProduct={() => {
                          setOverlayClicked(!overlayClicked);
                          setpreviewProductClicked(!previewProductClicked);
                          setCurrentProductIndex(index);
                          setCurrentProduct(product);
                        }}
                        editProduct={() => {
                          setOverlayClicked(!overlayClicked);
                          setEditProductClicked(!editProductClicked);
                          setCurrentProductIndex(index);
                          setCurrentProduct(product);
                        }}
                        deleteProduct={() => {
                          setOverlayClicked(!overlayClicked);
                          setdeleteProductClicked(!deleteProductClicked);
                          setCurrentProductIndex(index);
                          setCurrentProduct(product);
                        }}
                      />
                    </tr>
                  ))
                ) : (
                  <div>No products available</div>
                )}
              </tbody>
            </table>
          </div>
          {previewProductClicked && (
            <div
              id="previewUserModal"
              tabindex="-1"
              aria-hidden="true"
              className={`flex fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0.1rem)] max-h-full`}
            >
              <ProductPreview
                product={currentProduct}
                closeModal={() => {
                  setOverlayClicked(!overlayClicked);
                  setpreviewProductClicked(!previewProductClicked);
                }}
              />
            </div>
          )}
          {addProductClicked && (
            <div
              id="addProductModal"
              tabindex="-1"
              aria-hidden="true"
              className={`flex mt-6 fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0.1rem)] max-h-full`}
            >
              <AddProductView
                products={fetchedProducts}
                category={categories}
                subcategory={subcategories}
                reload={() => setReloadComponent(true)}
                closeModal={() => {
                  setAddProductClicked(!addProductClicked);
                  setOverlayClicked(!overlayClicked);
                }}
              />
            </div>
          )}
          {editProductClicked && (
            <div
              id="editProductModal"
              tabindex="-1"
              aria-hidden="true"
              className={`flex fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0.1rem)] max-h-full`}
            >
              <EditProductView
                product={currentProduct}
                reload={() => setReloadComponent(true)}
                closeModal={() => {
                  setEditProductClicked(!editProductClicked);
                  setOverlayClicked(!overlayClicked);
                }}
              />
            </div>
          )}
          {updateStockClicked && (
            <div
              id="updateProductModal"
              tabindex="-1"
              aria-hidden="true"
              className={`flex fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0.1rem)] max-h-full`}
            >
              <UpdateStockView
                product={currentProduct}
                setReloadComponent={(e) => {
                  setReloadComponent(e);
                }}
                closeModal={() => {
                  setUpdateStockClicked(!updateStockClicked);
                  setOverlayClicked(!overlayClicked);
                }}
              />
            </div>
          )}
          {addCatViewClicked && (
            <div
              id="AddCategoryModal"
              tabindex="-1"
              aria-hidden="true"
              className={`flex fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0.1rem)] max-h-full`}
            >
              <AddCatView
                categories={categories}
                setReloadComponent={() => {
                  setReloadComponent(true);
                }}
                closeModal={() => {
                  setAddCatViewClicked(!addCatViewClicked);
                  setOverlayClicked(!overlayClicked);
                }}
              />
            </div>
          )}
          {addSubCatViewClicked && (
            <div
              id="AddSubCategoryModal"
              tabindex="-1"
              aria-hidden="true"
              className={`flex fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0.1rem)] max-h-full`}
            >
              <AddSubCatView
                category={categories}
                subcategory={subcategories}
                setReloadComponent={(e) => {
                  setReloadComponent(e);
                }}
                closeModal={() => {
                  setAddSubCatViewClicked(!addSubCatViewClicked);
                  setOverlayClicked(!overlayClicked);
                }}
              />
            </div>
          )}
          {deleteProductClicked && (
            <div
              id="delete-modal"
              tabindex="-1"
              class={`flex ml-10 fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0.1rem)] max-h-full`}
            >
              <div class="relative w-full h-auto max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-toggle="delete-modal"
                    onClick={() => {
                      setOverlayClicked(!overlayClicked);
                      setdeleteProductClicked(!deleteProductClicked);
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
                  <div class="p-6 text-center">
                    <svg
                      aria-hidden="true"
                      class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                      fill="none"
                      stroke="currentColor"
                      viewbox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this product?
                    </h3>
                    <button
                      data-modal-toggle="delete-modal"
                      type="button"
                      class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      onClick={() => {
                        deleteProduct(currentProduct.id);
                      }}
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      data-modal-toggle="delete-modal"
                      type="button"
                      class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      onClick={() => {
                        setOverlayClicked(!overlayClicked);
                        setdeleteProductClicked(!deleteProductClicked);
                      }}
                    >
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <AccessDenied />
      )}
    </React.Fragment>
  );
};

export default ManageProducts;
