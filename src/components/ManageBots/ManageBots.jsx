import React, { useState, useEffect } from "react";
import BotEditor from "../Drawer/BotEditor";
import BotCreator from "../Drawer/BotCreator";
import DeleteModal from "../Modals/DeleteModal";
import BotCard from "./BotCard";
const ManageBots = ({ bool }) => {
  const [viewEditDrawer, setViewEditDrawer] = useState(false);
  const [viewAddDrawer, setViewAddDrawer] = useState(false);
  const [viewDeleteModal, setViewDeleteModal] = useState(false);
  return (
    <React.Fragment>
      <div
        className={`${
          viewEditDrawer || viewDeleteModal ||viewAddDrawer ? "opacity-40" : " "
        }  transition-transform duration-300 ease-in-out  `}
      >
        <div className=" w-full py-4 px-1 mt-2 flex justify-between pr-8">
          <div className="w-72">
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-1"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search bots"
              />
            </div>
          </div>
          <button
            type="button"
            class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => { setViewAddDrawer(true)} }
          >
            <svg
              class="w-4 h-4 text-green-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        {/* <div class="flex items-center justify-center py-4 md:py-8 flex-wrap">
    <button type="button" class="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800">All categories</button>
    <button type="button" class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Shoes</button>
    <button type="button" class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Bags</button>
    <button type="button" class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Electronics</button>
    <button type="button" class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Gaming</button>
</div> */}
        <div class="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3  gap-3 mt-10 animate-view-content">
          <div>
            <BotCard
              editClicked={() => setViewEditDrawer(true)}
              deleteClicked={() => {
                setViewDeleteModal(true);
              }}
            />
          </div>
          <div>
            <BotCard />
          </div>
          <div>
            <BotCard />
          </div>
          <div>
            <BotCard />
          </div>
        </div>
      </div>

      {viewEditDrawer && (
        <BotEditor
          view={viewEditDrawer}
          close={() => {
            setViewEditDrawer(!viewEditDrawer);
          }}
        />
      )}
      {viewAddDrawer && (
        <BotCreator
          view={viewAddDrawer}
          close={() => {
            setViewAddDrawer(!viewAddDrawer);
          }}
        />
      )}
      {viewDeleteModal && (
        <DeleteModal close={() => setViewDeleteModal(false)} />
      )}
    </React.Fragment>
  );
};

export default ManageBots;
