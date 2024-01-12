import React from "react";

const ActionDropdown = () => {
  return (
    <React.Fragment>
      <div
        id="actionsDropdown"
        class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
      >
        <ul
          class="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="actionsDropdownButton"
        >
          <li>
            <a
              href="#"
              class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Mass Edit
            </a>
          </li>
        </ul>
        <div class="py-1">
          <a
            href="#"
            class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Delete all
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ActionDropdown;
