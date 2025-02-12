import React, { useState, useEffect } from "react";
import ProductRow from "./ProductRow";
import ProductPreview from "../ManageProducts/ProductPreview";
import UpdateStockView from "./UpdateStockView";
import AccessDenied from "../AccessDenied";
import { Toaster, toast } from "react-hot-toast";

import {
  DeleteProduct,
  FetchCategories,
  FetchProducts,
} from "../../api/ProductApi";
const ManageStock = ({ bool }) => {
  const [fetchedProducts, setFetchedProducts] = useState(null);
  const [productsToview, setProductsToView] = useState([]);
  const [overlayClicked, setOverlayClicked] = useState(false);
  const [editProductClicked, setEditProductClicked] = useState(false);
  const [previewProductClicked, setpreviewProductClicked] = useState(false);
  const [deleteProductClicked, setdeleteProductClicked] = useState(false);

  const [currentProduct, setCurrentProduct] = useState([]);
  const [reloadComponent, setReloadComponent] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (adminId) => {
    setOpenDropdown((prevOpenDropdown) =>
      prevOpenDropdown === adminId ? null : adminId
    );
  };

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

    const fetchProducts = async () => {
      if (bool) {
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
      }
    };

    if (bool) {
      fetchProducts();
      fetchCategories();
    }
  }, [reloadComponent]);

  const deleteProduct = async (id) => {
    try {
      const response = await DeleteProduct(id);
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
  return (
    <React.Fragment>
      {bool ? (
        <div className="animate-view-content relative m-5">
          <Toaster className="notifier" />
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg admin-table">
            <div
              class={`flex items-center lg:px-6 justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900 ${
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
                  onChange={(e) => searchProduct(e)}
                />
              </div>
              <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
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
                    #ID
                  </th>
                  <th scope="col" class="px-8">
                    Product
                  </th>
                  <th scope="col" class="p-4">
                    Stock
                  </th>
                  <th scope="col" class="p-4">
                    Category
                  </th>
                  <th scope="col" class="p-4 ">
                    Subcategory
                  </th>

                  <th scope="col" class="p-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {fetchedProducts !== null ? (
                  productsToview.length !== 0 ? (
                    productsToview.map((product) => (
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={product.id}>
                        <ProductRow
                          
                          product={product}
                          categories={categories}
                          subcategories={subcategories}
                          openDropdown={openDropdown}
                          toggleDropdown={() => toggleDropdown(product.id)}
                          previewProduct={() => {
                            setOverlayClicked(!overlayClicked);
                            setpreviewProductClicked(!previewProductClicked);
                            
                            setCurrentProduct(product);
                          }}
                          editProduct={() => {
                            setOverlayClicked(!overlayClicked);
                            setEditProductClicked(!editProductClicked);
                           
                            setCurrentProduct(product);
                          }}
                          deleteProduct={() => {
                            setOverlayClicked(!overlayClicked);
                            setdeleteProductClicked(!deleteProductClicked);
                            
                            setCurrentProduct(product);
                          }}
                        />
                      </tr>
                    ))
                  ) : (
                    <div className="m-8">No products available</div>
                  )
                ) : (
                  <div className="m-8">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-orange-400"
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
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
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
            id="editProductModal"
            tabindex="-1"
            aria-hidden="true"
            className={`flex ml-10 fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0.1rem)] max-h-full ${
              editProductClicked ? "" : "hidden"
            }`}
          >
            <UpdateStockView
              product={currentProduct}
              setReloadComponent={(e) => {
                setReloadComponent(e);
              }}
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
      ) : (
        <AccessDenied />
      )}
    </React.Fragment>
  );
};

export default ManageStock;
