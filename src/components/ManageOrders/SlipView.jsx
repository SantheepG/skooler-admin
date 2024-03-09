import React from "react";
import { s3base_URL } from "../../App";
const SlipView = ({ order, closeModal }) => {
  const handleImageClick = () => {
    const imageUrl = `${s3base_URL}${order.bank_slip}`;
    window.open(imageUrl, "_blank");
  };
  return (
    <>
      {order ? (
        <div class="relative w-full max-w-xl max-h-full">
          <form class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Update order details
                <div className="text-xs text-gray-500">
                  Order ID : # {order.id} | Order type : {order.order_type}
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
                    <a href="#">Close</a>
                  </span>
                </button>
              </div>
            </div>
            <div className="w-72 flex justify-center mx-auto overflow-y-auto overflow-x-auto">
              <img
                src={`${s3base_URL}${order.bank_slip}`}
                alt="Bank slip"
                className="cursor-pointer"
                onClick={handleImageClick}
              />
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};
export default SlipView;
