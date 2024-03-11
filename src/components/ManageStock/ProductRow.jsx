import React, { useState, useEffect } from "react";
import { formatDate } from "../../CommonFuncs";
import { s3base_URL } from "../../App";

const OrderRow = ({
  product,
  previewProduct,
  editProduct,
  categories,
  subcategories,
  openDropdown,
  toggleDropdown,
}) => {
  const [viewEditDropdown, setViewEditDropdown] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubCategoryName] = useState("");

  useEffect(() => {
    if (openDropdown === product.id) {
      setViewEditDropdown(true);
    } else {
      setViewEditDropdown(false);
    }
  }, [openDropdown]);
  useEffect(() => {
    if (categories.length !== 0 && subcategories.length !== 0) {
      const cat = categories.filter((item) => item.id === product.category_id);
      setCategoryName(cat[0].name);
      if (product.subcategory_id !== null) {
        const subcat = subcategories.filter(
          (item) => item.id === product.subcategory_id
        );
        setSubCategoryName(subcat[0].name);
      }
    }
  }, [categories, subcategories]);
  return (
    <React.Fragment>
      <td class="px-5 p-4">
        <div class="flex items-center text-gray-600">{product.id}</div>
      </td>
      <th
        scope="row"
        class=" px-8 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div class="flex h-16 w-16 items-center m-1 rounded-full">
          <img
            src={`${s3base_URL}${product.thumbnail}`}
            alt="iMac Front Image"
            class="h-14 max-w-14 mr-3"
          />
          {product.name}
        </div>
        <div className="text-xs text-gray-500">
          <span>color: {product.color + " "} |</span>
          <span> size : {product.size + " "}</span>
        </div>
        <div className="text-gray-400 text-xs py-3">
          Last updated :{" "}
          {product.updated_at !== null && formatDate(product.updated_at)}
        </div>
      </th>
      <td class="px-8 py-3">
        {product.stock < 5 ? (
          <div class="flex font-semibold items-center text-red-600">
            {product.stock}
          </div>
        ) : (
          <div class="flex items-center">{product.stock}</div>
        )}
      </td>
      <td class="px-4 py-3">
        <div class="flex items-center">{categoryName}</div>
      </td>
      <td class="px-4 py-3">
        <div class="flex items-center">{subcategoryName}</div>
      </td>

      <td class="px-6 py-4">
        <a
          href="#"
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={toggleDropdown}
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
        {viewEditDropdown && (
          <ul
            className={`absolute z-[1000] float-left m-0  min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block ${
              viewEditDropdown ? "-mx-32 -mt-12" : "hidden"
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
                Update stock
              </a>
            </li>
          </ul>
        )}
      </td>
    </React.Fragment>
  );
};
export default OrderRow;
