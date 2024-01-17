import React, { useState } from "react";
import defaultImg from "../../assets/default-avatar.png";
const UserRow = ({ userData, toggleActiveStatus, ViewOverlayHandler }) => {
  const [viewUserDetails, setViewUserDetails] = useState(false);
  const [viewEditDropdown, setViewEditDropdown] = useState(false);

  return (
    <React.Fragment>
      <th
        scope="row"
        class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img src={defaultImg} alt="img" className="user-img" />
        <div class="ps-3">
          <div class="text-base font-semibold">{userData.name}</div>
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
        <a
          href="#"
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={() => setViewEditDropdown(!viewEditDropdown)}
        >
          edit
        </a>
        <ul
          className={`fixed z-[1000] float-left m-0  min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block ${
            viewEditDropdown ? "" : "hidden"
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
          <li>
            <a
              class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-red-700 hover:bg-red-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
              href="#"
              data-te-dropdown-item-ref
            >
              Delete
            </a>
          </li>
        </ul>
      </td>
    </React.Fragment>
  );
};
export default UserRow;
