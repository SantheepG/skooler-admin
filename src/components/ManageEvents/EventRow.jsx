import React, { useState, useEffect } from "react";
import { formatDate } from "../../CommonFuncs";
const EventRow = ({
  event,
  previewEvent,
  editEvent,
  openDropdown,
  toggleDropdown,
  deleteEvent,
}) => {
  const [viewEditDropdown, setViewEditDropdown] = useState(false);

  useEffect(() => {
    if (openDropdown === event.id) {
      setViewEditDropdown(true);
    } else {
      setViewEditDropdown(false);
    }
  }, [openDropdown]);

  return (
    <React.Fragment>
      <td class="px-5 p-4 h-36">
        <div class="flex items-center text-gray-600">{event.id}</div>
      </td>
      <th
        scope="row"
        class="flex items-center px-6 py-14 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div class="flex items-center mr-3">{event.event_name}</div>
      </th>
      <td class="px-6 py-3">
        <div class="flex items-center">{event.event_info}</div>
        <div class="flex items-center text-gray-400 text-xs">
          Date :{" "}
          {event.event_datetime !== null && formatDate(event.event_datetime)}
        </div>
        <div className="text-gray-400 text-xs py-1.5">
          Last updated :{" "}
          {event.updated_at !== null && formatDate(event.updated_at)}
        </div>
      </td>
      <td class="px-8 py-3">
        <div class="w-36 flex items-center overflow-hidden whitespace-nowrap">
          {event.venue}
        </div>
      </td>
      <td class="px-4 py-3">
        <div class="flex items-center">{event.capacity}</div>
      </td>
      <td class="px-4 py-3">
        <div class="flex items-center">{event.reserved_slots}</div>
      </td>
      <td class="px-8 py-3 ">
        <div class="flex items-center">{event.payment}</div>
      </td>

      <td class="px-12 py-4">
        <button
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
        </button>
        {viewEditDropdown && (
          <ul
            className={`absolute -mx-24 -mt-16 z-[1000] float-left   min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block`}
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
                  previewEvent();
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
                  editEvent();
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
                  deleteEvent();
                }}
              >
                Delete
              </a>
            </li>
          </ul>
        )}
      </td>
    </React.Fragment>
  );
};
export default EventRow;
