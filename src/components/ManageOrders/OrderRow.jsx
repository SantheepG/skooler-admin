import React, { useState, useEffect } from "react";

const OrderRow = ({
  order,
  openDropdown,
  toggleDropdown,
  deleteOrder,
  previewOrder,
  editOrder,
}) => {
  const [viewEditDropdown, setViewEditDropdown] = useState(false);

  useEffect(() => {
    if (openDropdown === order.id) {
      setViewEditDropdown(true);
    } else {
      setViewEditDropdown(false);
    }
  }, [openDropdown]);

  const getFormattedDate = (timestamp) => {
    if (timestamp !== null) {
      const datePart = timestamp.split("T")[0];
      const timePart = timestamp.split("T")[1].split(".")[0];

      const datetime = `${datePart} ${timePart}`;

      return datetime;
    }
    return null;
  };
  return (
    <React.Fragment>
      <tr class="h-36 bg-white border-b dark:border-gray-700">
        <th
          scope="row"
          class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {order.id}{" "}
          <div className="text-xs text-gray-500 mt-1">
            <span>{order.order_type}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            <span>
              {order.created_at !== null
                ? getFormattedDate(order.created_at)
                : null}
            </span>
          </div>
        </th>
        <td class="px-4 py-3 text-gray-900">{order.user_id}</td>
        <td class="px-4 py-3 text-gray-900">
          {order.dispatch_datetime !== null ? order.dispatch_datetime : null}
          <div className="text-xs text-gray-500 mt-1">
            <span>Address : {order.dispatch_address}</span>
          </div>
        </td>
        <td class="px-4 py-3 max-w-[12rem] truncate text-gray-900">
          <span>$</span>
          {order.total_price}
          <div className="text-xs text-gray-500 mt-1">
            <span>{order.payment_method}</span>
          </div>
        </td>
        <td class="px-2 py-3">
          <div className="flex">
            {order.order_status === "Delivered" ? (
              <>
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mt-1 mr-2"></div>
                <div>{order.order_status}</div>
              </>
            ) : order.order_status === "Cancelled" ? (
              <>
                <div className="h-2.5 w-2.5 rounded-full bg-red-600 mt-1 mr-2"></div>
                <div>{order.order_status}</div>
              </>
            ) : (
              <>
                <div className="h-2.5 w-2.5 rounded-full bg-orange-400 mt-1 mr-2"></div>
                <div>{order.order_status}</div>
              </>
            )}
          </div>
        </td>
        <td class="relative px-4 py-3 flex items-center justify-start">
          <button
            id="apple-imac-27-dropdown-button"
            data-dropdown-toggle="apple-imac-27-dropdown"
            class="mt-10 items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
            type="button"
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
          </button>
          <ul
            className={`absolute right-32 top-0 z-[1000] m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block ${
              viewEditDropdown ? "mt-6" : "hidden"
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
                  previewOrder();
                  setViewEditDropdown(!viewEditDropdown);
                }}
              >
                Preview
              </a>
            </li>

            <li>
              <a
                class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-red-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-red-600"
                href="#"
                data-te-dropdown-item-ref
                onClick={() => {
                  editOrder();
                  setViewEditDropdown(!viewEditDropdown);
                }}
              >
                Update
              </a>
            </li>
            <li>
              <a
                class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-red-700 hover:bg-neutral-100 active:text-red-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-red-600"
                href="#"
                data-te-dropdown-item-ref
                onClick={() => {
                  setViewEditDropdown(!setViewEditDropdown);
                  deleteOrder();
                }}
              >
                Delete
              </a>
            </li>
          </ul>
        </td>
      </tr>
    </React.Fragment>
  );
};
export default OrderRow;
