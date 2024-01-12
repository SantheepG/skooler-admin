import React, { useState, useEffect } from "react";
import ProductRow from "./ProductRow";
import ProductPreview from "./ProductPreview";
import EditProductView from "./EditProductView";
import AddProductView from "./AddProductView";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [overlayClicked, setOverlayClicked] = useState(false);
  const [addProductClicked, setAddProductClicked] = useState(false);
  const [editProductClicked, setEditProductClicked] = useState(false);
  const [previewProductClicked, setpreviewProductClicked] = useState(false);
  const [deleteProductClicked, setdeleteProductClicked] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [reloadComponent, setReloadComponent] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products");
        if (response) {
          setProducts(response.data);
          setReloadComponent(false);
        }
      } catch (error) {
        console.log("Error Fetching products", error);
        setReloadComponent(false);
      }
    };
    fetchProducts();
  }, [reloadComponent]);

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/deleteproduct/${id}`
      );
      if (response) {
        console.log("Successfully deleted");
        toast.success("Successfully deleted", {
          duration: 1200,
          position: "top-center",
          //icon: "❌",
        });

        const timerId = setTimeout(() => {
          setReloadComponent(true);
        }, 1600);

        return () => clearTimeout(timerId);
      } else {
        console.log("Something went wrong");
        toast.error("Something went wrong", {
          duration: 1200,
          position: "top-center",
          //icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <div className="relative m-5">
        <Toaster className="notifier" />
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg admin-table">
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
                class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for products"
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
              <button
                id="filterDropdownButton"
                data-dropdown-toggle="filterDropdown"
                class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                Filter
                <svg
                  class="-mr-1 ml-1.5 w-5 h-5"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
              </button>
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
                  Product ID
                </th>
                <th scope="col" class="p-4">
                  Product
                </th>
                <th scope="col" class="p-4">
                  Price
                </th>
                <th scope="col" class="p-4 px-6">
                  Discount
                </th>
                <th scope="col" class="p-4">
                  Category
                </th>
                <th scope="col" class="p-4">
                  Subcategory
                </th>
                <th scope="col" class="p-4">
                  Stock
                </th>

                <th scope="col" class="p-4">
                  Rating
                </th>
                <th scope="col" class="p-4">
                  Sales
                </th>

                <th scope="col" class="p-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <ProductRow
                    key={index}
                    product={product}
                    previewProduct={() => {
                      setOverlayClicked(!overlayClicked);
                      setpreviewProductClicked(!previewProductClicked);
                      setCurrentProductIndex(index);
                      setCurrentProduct(products[index]);
                    }}
                    editProduct={() => {
                      setOverlayClicked(!overlayClicked);
                      setEditProductClicked(!editProductClicked);
                      setCurrentProductIndex(index);
                      setCurrentProduct(products[index]);
                    }}
                    deleteProduct={() => {
                      setOverlayClicked(!overlayClicked);
                      setdeleteProductClicked(!deleteProductClicked);
                      setCurrentProductIndex(index);
                      setCurrentProduct(products[index]);
                    }}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          id="previewUserModal"
          tabindex="-1"
          aria-hidden="true"
          className={`flex ml-10 fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0.1rem)] max-h-full ${
            previewProductClicked ? "" : "hidden"
          }`}
        >
          <ProductPreview
            product={currentProduct}
            closeModal={() => {
              setOverlayClicked(!overlayClicked);
              setpreviewProductClicked(!previewProductClicked);
            }}
          />
        </div>
        <div
          id="addProductModal"
          tabindex="-1"
          aria-hidden="true"
          className={`flex ml-10 fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0.1rem)] max-h-full ${
            addProductClicked ? "" : "hidden"
          }`}
        >
          <AddProductView
            closeModal={() => {
              setAddProductClicked(!addProductClicked);
              setOverlayClicked(!overlayClicked);
              setReloadComponent(true);
            }}
          />
        </div>
        <div
          id="editProductModal"
          tabindex="-1"
          aria-hidden="true"
          className={`flex ml-10 fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0.1rem)] max-h-full ${
            editProductClicked ? "" : "hidden"
          }`}
        >
          <EditProductView
            product={currentProduct}
            closeModal={() => {
              setEditProductClicked(!editProductClicked);
              setOverlayClicked(!overlayClicked);
            }}
          />
        </div>
        <div
          id="delete-modal"
          tabindex="-1"
          class={`flex ml-10 fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0.1rem)] max-h-full ${
            deleteProductClicked ? "" : " hidden"
          }`}
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
                    deleteProduct(currentProduct.products_id);
                    setOverlayClicked(!overlayClicked);
                    setdeleteProductClicked(!deleteProductClicked);
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
      </div>
    </React.Fragment>
  );
};

export default ManageProducts;
