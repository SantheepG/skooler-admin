import React from "react";
import defaultAvatar from "../../assets/default-avatar.png";
import { s3base_URL } from "../../App";
const UserDetailsView = ({ ViewOverlayHandler, user }) => {
  return (
    <React.Fragment>
      {user ? (
        <div class="relative w-full max-w-2xl max-h-full">
          <form class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <div className="h-24 w-24 rounded-full">
                <img
                  src={`${s3base_URL}${user.profile_pic}`}
                  alt="User"
                  onError={(e) => {
                    e.target.src = defaultAvatar;
                  }}
                  class="h-24 w-auto max-w-36 rounded-full"
                />
              </div>
              <h3 class="text-xl my-6 mx-4 font-semibold text-gray-900 dark:text-white">
                {user.first_name} {user.last_name}
                <div className="text-xs text-gray-500">
                  User ID : <span>#{user.id}</span>
                </div>
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="editUserModal"
                onClick={ViewOverlayHandler}
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">
                  <a href="#">Close modal</a>
                </span>
              </button>
            </div>

            <div class="p-6 space-y-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first-name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    class="pl-5 shadow-sm bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-3xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Bonnie"
                    required=""
                    value={user.name}
                    disabled
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="last-name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    class="pl-5 shadow-sm bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-3xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Green"
                    required=""
                    disabled
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="pl-5 shadow-sm bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-3xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@company.com"
                    required=""
                    value={user.email}
                    disabled
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="phone-number"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone-number"
                    id="phone-number"
                    class="pl-5 shadow-sm bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-3xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="e.g. +(12)3456 789"
                    required=""
                    value={user.mobile_no}
                    disabled
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="student_id"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Student ID
                  </label>
                  <input
                    type="text"
                    name="student_id"
                    id="student_id"
                    class="pl-5 shadow-sm bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-3xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Development"
                    value={user.student_id}
                    required=""
                    disabled
                  />
                </div>
                <div class="col-span-6 sm:col-span-3"></div>
                <div class="col-span-6 sm:col-span-3"></div>
                <div class="col-span-6 sm:col-span-3"></div>
              </div>
            </div>

            <div class="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={ViewOverlayHandler}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default UserDetailsView;
