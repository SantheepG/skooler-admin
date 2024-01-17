import React from "react";

const ProductPreview = ({ closeModal, product }) => {
  return (
    <React.Fragment>
      {product ? (
        <div class="relative w-full max-w-3xl max-h-full">
          <form class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Product details
                <div className="text-xs text-gray-500">
                  Product ID : #{product.products_id}
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
              <div class="grid grid-cols-5 gap-3 mb-4 sm:mb-5">
                <div class="p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700">
                  <img
                    src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-side-image.png"
                    alt="iMac Side Image"
                  />
                </div>
                <div class="p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700">
                  <img
                    src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png"
                    alt="iMac Front Image"
                  />
                </div>
                <div class="p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700">
                  <img
                    src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-back-image.png"
                    alt="iMac Back Image"
                  />
                </div>
                <div class="p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700">
                  <img
                    src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-side-image.png"
                    alt="iMac Back Image"
                  />
                </div>
              </div>
              <dl class="sm:mb-5">
                <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                  Details - {product.name}
                </dt>
                <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                  {product.description}
                </dd>
              </dl>
              <dl class="grid grid-cols-2 gap-4 mb-4">
                <div class="col-span-2 p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 sm:col-span-1 dark:border-gray-600">
                  <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Category
                  </dt>
                  <dd class="flex items-center text-gray-500 dark:text-gray-400">
                    {product.category_id}
                  </dd>
                </div>

                <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                  <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Subcategory
                  </dt>
                  <dd class="text-gray-500 dark:text-gray-400">
                    <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                      {product.subcategory_id}
                    </span>
                  </dd>
                </div>
                <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                  <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Price
                  </dt>
                  <dd class="text-gray-500 dark:text-gray-400">
                    {product.price}
                  </dd>
                </div>
                <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                  <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Discount
                  </dt>
                  <dd class="text-gray-500 dark:text-gray-400">
                    {product.discount}%
                  </dd>
                </div>
                <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                  <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Discounted Price
                  </dt>
                  <dd class="text-gray-500 dark:text-gray-400">
                    {product.discounted_price}
                  </dd>
                </div>
                <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                  <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Stock
                  </dt>
                  <dd class="text-gray-500 dark:text-gray-400">
                    {product.stock}
                  </dd>
                </div>
                <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                  <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Size
                  </dt>
                  <dd class="text-gray-500 dark:text-gray-400">
                    {product.size}
                  </dd>
                </div>
                <div class="col-span-2 p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 sm:col-span-1 dark:border-gray-600">
                  <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Colors
                  </dt>
                  <dd class="flex items-center space-x-2 font-light text-gray-500 dark:text-gray-400">
                    <div
                      class={`flex-shrink-0 w-6 h-6 bg-${product.color} rounded-full`}
                    ></div>
                  </dd>
                </div>
              </dl>
            </div>
          </form>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default ProductPreview;
