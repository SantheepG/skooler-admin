import React from "react";

const EventPreview = ({ closeModal, event }) => {
  return (
    <React.Fragment>
      <div class="relative w-full max-w-3xl max-h-full">
        <form class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Event details
              <div className="text-xs text-gray-500">
                Event ID : #{event.id}
              </div>
            </h3>

            <div>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="editUserModal"
                onClick={() => closeModal()}
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
                  <a href="#">Close</a>
                </span>
              </button>
            </div>
          </div>
          <div className="p-4 h-96 overflow-y-auto">
            <div class="grid grid-cols-5 gap-3 mb-4 sm:mb-5">
              <div class="p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700">
                <img
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D"
                  alt="iMac Side Image"
                />
              </div>
              <div class="p-2 w-auto bg-gray-100 rounded-lg dark:bg-gray-700">
                <img
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D"
                  alt="iMac Front Image"
                />
              </div>
            </div>
            <dl class="sm:mb-5">
              <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                Event name - {event.event_name}
              </dt>
              <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                {event.event_info}
                Venue : {event.venue}
              </dd>
            </dl>
            <dl class="grid grid-cols-2 gap-4 mb-4">
              <div class="col-span-2 p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 sm:col-span-1 dark:border-gray-600">
                <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                  Announced on
                </dt>
                <dd class="flex items-center text-gray-500 dark:text-gray-400">
                  event.created_at.slice(0, -17) - event.created_at.slice(-16,
                  -8)
                </dd>
              </div>

              <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                  Last updated
                </dt>
                <dd class="text-gray-500 dark:text-gray-400">
                  event.updated_at.slice(0, -17)- event.updated_at.slice(-16,
                  -8)
                </dd>
              </div>
              <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                  Payment
                </dt>
                <dd class="text-gray-500 dark:text-gray-400">
                  {event.payment}
                </dd>
              </div>
              <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                  Date & time
                </dt>
                <dd class="text-gray-500 dark:text-gray-400">
                  {event.event_datetime}
                </dd>
              </div>
              <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                  Payment deadline
                </dt>
                <dd class="text-gray-500 dark:text-gray-400">
                  {event.payment_deadline}
                </dd>
              </div>
              <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white"></dt>
                <dd class="text-gray-500 dark:text-gray-400">
                  <div className="flex items-center overflow-hidden whitespace-wrap"></div>
                </dd>
              </div>
            </dl>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default EventPreview;
