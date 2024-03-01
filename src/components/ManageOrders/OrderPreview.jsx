import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
const OrderPreview = ({ closeModal, order, school }) => {
  const [view, setView] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const ParseProducts = () => {
      if (order !== null) {
        let products = JSON.parse(order.products);
        setProducts(products);
      }
    };
    ParseProducts();
  }, [order]);
  return (
    <React.Fragment>
      {order ? (
        <div class="relative w-full max-w-3xl max-h-full">
          <form class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Order details
                <div className="text-xs text-gray-500">
                  Order ID : #{order.id} | Order type : {order.order_type}
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
            <div className="p-4 h-96 overflow-y-auto">
              <dl class="grid grid-cols-1 gap-4 mb-4">
                {products.map((product, index) => (
                  <div
                    key={index}
                    class="col-span-4 p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 sm:col-span-1 dark:border-gray-600"
                  >
                    <dt class="flex mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                      #{product.product_id} - {product.name}
                    </dt>
                    <div>
                      <span className="flex">
                        {school.currency + " "}
                        {product.price}
                      </span>
                      <span>qty : {product.qty}</span>
                    </div>
                    <dd class="flex items-center text-gray-500 dark:text-gray-400"></dd>
                  </div>
                ))}
              </dl>
            </div>
          </form>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default OrderPreview;
