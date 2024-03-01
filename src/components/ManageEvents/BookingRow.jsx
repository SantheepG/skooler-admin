import React from "react";
import { formatDate } from "../../CommonFuncs";
const BookingRow = ({ booking, deleteClicked }) => {
  return (
    <React.Fragment>
      <td class="px-5">
        <div class="flex items-center text-gray-600">{booking.id}</div>
      </td>
      <td class="px-5">
        <div class="flex items-center text-gray-600">{booking.event_name}</div>
      </td>
      <td class="px-4 py-3">
        <div class="flex items-center text-gray-600">
          #{booking.id} {booking.user_name}
        </div>
        <div class="flex items-center text-gray-600 text-xs">
          {booking.user_email} | {booking.user_mobile_no}
        </div>
        <div class="flex items-center text-gray-400 text-xs py-2">
          Booked on :{" "}
          {booking.created_at !== null && formatDate(booking.created_at)}
        </div>
      </td>

      <td class="px-4 py-3">
        <div class="flex items-center">{booking.tickets}</div>
      </td>
      <td class="px-4 py-3">
        <div class="flex items-center">{booking.paid}</div>
        <div class="flex items-center">{booking.payment_method}</div>
      </td>

      <td class="px-6 py-4">
        <button
          id="edit"
          data-dropdown-toggle="apple-imac-27-dropdown"
          className="inline-flex items-center text-sm font-medium hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
          type="button"
          onClick={deleteClicked}
        >
          Cancel
        </button>
      </td>
    </React.Fragment>
  );
};
export default BookingRow;
