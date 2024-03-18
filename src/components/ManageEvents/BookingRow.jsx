import React from "react";
import { formatDate, formatNumberWithSpace } from "../../CommonFuncs";
const BookingRow = ({ booking, deleteClicked, viewSlip, verified, denied }) => {
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
          #{booking.user_id} {booking.user_name}
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
        <div class="flex items-center">
          {formatNumberWithSpace(booking.paid)}
        </div>
        <div class="flex items-center">{booking.payment_method}</div>
        {booking.bank_slip && (
          <a
            href="#"
            className="text-xs text-blue-500 rounded-xl hover:text-blue-800"
            onClick={viewSlip}
          >
            view slip
          </a>
        )}
      </td>
      <td class="px-2 py-3 ">
        <div className="flex">
          {booking.status === "Verified" && (
            <div class="h-2.5 w-2.5 mt-1 rounded-full bg-green-500 me-2"></div>
          )}
          {booking.status === "Pending" && (
            <div class="h-2.5 w-2.5 mt-1 rounded-full bg-orange-500 me-2"></div>
          )}
          {booking.status === "Denied" && (
            <div class="h-2.5 w-2.5 mt-1 rounded-full bg-red-500 me-2"></div>
          )}
          {booking.status}
        </div>
        {booking.status === "Pending" && (
          <>
            <button
              className="text-xs border px-2 py-0.5 mt-2 rounded-lg hover:border-green-500 hover:text-green-400"
              onClick={verified}
            >
              Approve
            </button>
            <button
              className="text-xs border px-2 py-0.5 mt-2 mx-1 rounded-lg hover:border-red-600 hover:text-red-600"
              onClick={denied}
            >
              Deny
            </button>
          </>
        )}
      </td>

      <td class="px-6 py-4">
        <button
          id="edit"
          data-dropdown-toggle="apple-imac-27-dropdown"
          className="inline-flex items-center text-sm font-medium hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
          type="button"
          onClick={deleteClicked}
        >
          Delete
        </button>
      </td>
    </React.Fragment>
  );
};
export default BookingRow;
