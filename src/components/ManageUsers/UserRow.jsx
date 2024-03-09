import React, { useState, useEffect } from "react";
import defaultImg from "../../assets/default-avatar.png";

import { s3base_URL } from "../../App";
const UserRow = ({
  userData,
  openDropdown,
  toggleDropdown,
  toggleActiveStatus,
  ViewOverlayHandler,
}) => {
  const [viewUserDetails, setViewUserDetails] = useState(false);
  const [viewEditDropdown, setViewEditDropdown] = useState(false);

  useEffect(() => {
    if (openDropdown === userData.id) {
      setViewEditDropdown(true);
    } else {
      setViewEditDropdown(false);
    }
  }, [openDropdown]);

  return (
    <React.Fragment>
      <th className="px-10">{userData.id}</th>
      <th
        scope="row"
        class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
      >
        <span className="h-12 w-12">
          <img
            alt="admin"
            className="h-12 max-w-12 rounded-full"
            src={`${s3base_URL}${userData.profile_pic}`}
            onError={(e) => {
              e.target.src = defaultImg;
            }}
          />
        </span>

        <div class="ps-3">
          <div class="text-base font-semibold">
            {userData.first_name + " "}
            {userData.last_name !== null && userData.last_name}
          </div>
          <div class="font-normal text-gray-500">{userData.email}</div>
        </div>
      </th>
      <td class="px-6 py-4">{userData.mobile_no}</td>
      <td class="px-6 py-4">
        {userData.is_active === 1 ? (
          <div class="flex items-center">
            <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
            Active
          </div>
        ) : (
          <div class="flex items-center">
            <div class="h-2.5 w-2.5 rounded-full bg-red-600 me-2"></div>{" "}
            Inactive
          </div>
        )}
      </td>
      <td class="px-2 py-4">
        <a
          href="#"
          type="button"
          data-modal-target="editUserModal"
          data-modal-show="editUserModal"
          class="m-3 font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={() => {
            setViewUserDetails(true);
            ViewOverlayHandler(userData);
          }}
        >
          view
        </a>
        <button
          href="#"
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={toggleDropdown}
        >
          <svg
            class="w-5 h-5 inline"
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
            className={`absolute z-[1000] float-left -mt-12 -ml-10 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block`}
            aria-labelledby="dropdownMenuButton1"
            data-te-dropdown-menu-ref
          >
            <li>
              <a
                class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                href="#"
                data-te-dropdown-item-ref
                onClick={() => {
                  toggleActiveStatus(userData.id, 1);

                  setViewEditDropdown(false);
                }}
              >
                Active
              </a>
            </li>
            <li>
              <a
                class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                href="#"
                data-te-dropdown-item-ref
                onClick={() => {
                  toggleActiveStatus(userData.id, 0);
                  setViewEditDropdown(false);
                }}
              >
                Inactive
              </a>
            </li>
          </ul>
        )}
      </td>
    </React.Fragment>
  );
};
export default UserRow;
