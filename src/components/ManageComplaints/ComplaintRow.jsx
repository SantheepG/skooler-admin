import React, { useState } from "react";

const ComplaintRow = ({ complaint, overlayClicked }) => {
  return (
    <React.Fragment>
      <tr class="border-b bg-white dark:border-gray-700">
        <th
          scope="row"
          class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {complaint.id}
        </th>
        <td class="px-4 py-3">{complaint.user_id}</td>
        <td class="px-4 py-3">
          # {complaint.product_id + " "}
          {complaint.product_name}
        </td>
        <td class="px-4 py-3 max-w-[12rem] truncate">
          {complaint.description}
        </td>
        <td class="px-4 py-3">
          <div className="flex">
            {complaint.status === "Pending" ? (
              <div class="h-2.5 w-2.5 rounded-full bg-orange-500 mt-1 mr-2"></div>
            ) : (
              <div class="h-2.5 w-2.5 rounded-full bg-green-500 mt-1 mr-2"></div>
            )}

            <div>{complaint.status}</div>
          </div>
        </td>
        <td class="px-4 py-3 flex items-center justify-start">
          <button
            id="edit"
            data-dropdown-toggle="apple-imac-27-dropdown"
            className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
            type="button"
            onClick={overlayClicked}
          >
            edit
          </button>
          <div
            id="edit"
            class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          ></div>
        </td>
      </tr>
    </React.Fragment>
  );
};
export default ComplaintRow;
