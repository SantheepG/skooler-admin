import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UpdateStock } from "../../api/ProductApi";

const UpdateStockView = ({ closeModal, product, setReloadComponent }) => {
  const [stock, setStock] = useState(0);

  useEffect(() => {
    setStock(product.stock);
  }, [product]);
  const updateStock = async (stockChange) => {
    try {
      if (stockChange !== product.stock) {
        const response = await UpdateStock(product.id, stockChange);
        if (response) {
          toast.success("Updated", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
          });
          setTimeout(() => {
            closeModal();
            setReloadComponent(true);
          }, 2200);
        } else {
          toast.error("Something went wrong", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <div class="animate-view-content relative w-full max-w-xs max-h-full">
        <ToastContainer />
        <form class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Update stock
              <div className="text-xs text-gray-500">
                Product ID : {product.products_id}
              </div>
            </h3>

            <div>
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
          <div className="p-4 h-56 overflow-y-auto w-full">
            <div class="mt-2">
              <div class="space-y-4 sm:space-y-6">
                <div>
                  <label
                    for="item-weight"
                    class="block mb-6 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    name="item-weight"
                    id="item-weight"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={stock}
                    min={0}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              class="py-2 px-12 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:outline-none focus:ring-gray-700 focus:text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="button"
              class="py-2 ml-2 mt-14 px-10 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:outline-none focus:ring-gray-700 focus:text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              onClick={() => updateStock(parseInt(stock))}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default UpdateStockView;
