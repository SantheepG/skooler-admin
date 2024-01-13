import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const UpdateStockView = ({ closeModal, product, setReloadComponent }) => {
  const [stockChange, setStockChange] = useState(0);

  const updateStock = async (stockChange) => {
    try {
      if (stockChange !== product.stock) {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/stock/${product.products_id}/${stockChange}`
        );
        if (response) {
          console.log("stock updated");
          toast.success("Stock updated", {
            duration: 1200,
            position: "top-center",
            //icon: "❌",
          });
          const timerId = setTimeout(() => {
            setReloadComponent(true);
            closeModal();
          }, 1300);

          return () => clearTimeout(timerId);
        } else {
          console.log("Something went wrong");
          toast.error("Something went wrong", {
            duration: 1200,
            position: "top-center",
            //icon: "❌",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <div class="relative w-full max-w-xs max-h-full">
        <Toaster className="notifier" />

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
                    placeholder={product.stock}
                    onChange={(e) => setStockChange(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              class="text-white mt-10 w-full bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-xs rounded-lg text-xs px-5 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={() => updateStock(stockChange)}
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
