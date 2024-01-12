import React, { useState } from "react";

const ProductRow = ({
  product,
  previewProduct,
  editProduct,
  deleteProduct,
}) => {
  const [viewEditDropdown, setViewEditDropdown] = useState(false);
  return (
    <React.Fragment>
      <td class="px-5 p-4">
        <div class="flex items-center text-gray-600">{product.products_id}</div>
      </td>
      <th
        scope="row"
        class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div class="flex items-center mr-3">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png"
            alt="iMac Front Image"
            class="h-8 w-auto mr-3"
          />
          {product.name}
        </div>
      </th>
      <td class="px-6 py-3">
        <div class="flex items-center">{product.price}</div>
      </td>
      <td class="px-10 py-3 ">
        <div class="flex items-center">{product.discount}%</div>
      </td>

      <td class="px-4 py-3">
        <div class="flex items-center">{product.category_id}</div>
      </td>
      <td class="px-4 py-3">
        <div class="flex items-center">{product.subcategory_id}</div>
      </td>
      <td class="px-6 py-3">
        {product.stock < 5 ? (
          <div class="flex items-center text-red-600">{product.stock}</div>
        ) : (
          <div class="flex items-center">{product.stock}</div>
        )}
      </td>
      <td class="px-5 py-3">
        <div class="flex items-center">4.5/5</div>
      </td>
      <td class="px-6 py-3">
        <div class="flex items-center">15</div>
      </td>
      <td class="px-6 py-4">
        <a
          href="#"
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={() => setViewEditDropdown(!viewEditDropdown)}
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewbox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </a>
        <ul
          className={`fixed z-[1000] float-left m-0  min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block ${
            viewEditDropdown ? "-mx-10" : "hidden"
          }`}
          aria-labelledby="dropdownMenuButton1"
          data-te-dropdown-menu-ref
        >
          <li>
            <a
              class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
              href="#"
              data-te-dropdown-item-ref
              onClick={() => {
                setViewEditDropdown(false);
                previewProduct();
              }}
            >
              Preview
            </a>
          </li>
          <li>
            <a
              class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
              href="#"
              data-te-dropdown-item-ref
              onClick={() => {
                setViewEditDropdown(false);
                editProduct();
              }}
            >
              Edit
            </a>
          </li>
          <li>
            <a
              class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-red-700 hover:bg-neutral-100 active:text-red-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-red-600"
              href="#"
              data-te-dropdown-item-ref
              onClick={() => {
                setViewEditDropdown(false);
                deleteProduct();
              }}
            >
              Delete
            </a>
          </li>
        </ul>
      </td>
    </React.Fragment>
  );
};
export default ProductRow;
