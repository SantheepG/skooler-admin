import React, { useEffect, useState } from "react";
import defaultImg from "../../assets/default-avatar.png";

const AdminRow = ({
  adminData,
  openDropdown,
  toggleDropdown,
  toggleAdminStatus,
  ViewAdminOverlayHandler,
  viewDeleteAdmin,
}) => {
  const [viewEditDropdown, setViewEditDropdown] = useState(false);
  const rolesString = adminData.roles;
  const rolesObject = JSON.parse(rolesString);

  const selectedRoles = Object.fromEntries(
    Object.entries(rolesObject).filter(([key, value]) => value === true)
  );

  useEffect(() => {
    if (openDropdown === adminData.id) {
      setViewEditDropdown(true);
    } else {
      setViewEditDropdown(false);
    }
  }, [openDropdown]);

  return (
    <React.Fragment>
      <th className="px-8">{adminData.id}</th>
      <th
        scope="row"
        class="flex items-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img
          alt="User"
          className="h-12 w-12"
          src={defaultImg}
          onError={(e) => {
            e.target.src = defaultImg;
          }}
        />
        <div class="ps-3">
          <div class="text-base font-semibold">
            <span>{adminData.first_name} </span>
            <span>{adminData.last_name}</span>
          </div>
          <div class="font-normal text-gray-500">{adminData.email}</div>
          <div class="flex mt-1 flex-wrap text-xs w-72">
            {selectedRoles.length !== 0 ? (
              Object.keys(selectedRoles).map((role, index) => (
                <span
                  key={index}
                  className="w-1/7 px-1 ml-1 mt-1 border border-gray-400 rounded text-gray-400"
                >
                  {role}
                </span>
              ))
            ) : (
              <span className="w-1/7 px-1 ml-1 mt-1 border border-gray-400 rounded text-gray-400"></span>
            )}
          </div>
        </div>
      </th>
      <td class="px-6 py-4">{adminData.mobile_no}</td>
      <td class="px-6 py-4">
        {adminData.is_active === 1 ? (
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
          data-modal-show="editUserModal"
          class="m-3 font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={() => {
            ViewAdminOverlayHandler(adminData);
          }}
        >
          edit
        </a>
        <button
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
            className={`absolute z-[1000] -mx-10 -mt-16 float-left m-0  min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block`}
            aria-labelledby="dropdownMenuButton1"
            data-te-dropdown-menu-ref
          >
            <li>
              <a
                class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                href="#"
                data-te-dropdown-item-ref
                onClick={() => {
                  toggleAdminStatus(adminData.id, 1);
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
                  toggleAdminStatus(adminData.id, 0);
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
                onClick={() => {
                  viewDeleteAdmin();
                  setViewEditDropdown(!viewEditDropdown);
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
export default AdminRow;
