import { BsRobot } from "react-icons/bs";

const BotCreator = ({ view, close }) => {
  return (
    <>
      <div
        id="drawer-right-example"
        className={`transition-transform translate-x-0  ${
          view
            ? "animate-slide-in-from-right"
            : "translate-x-full animate-slide-out-to-right"
        } border-l shadow-lg border-orange-300 fixed px-8 lg:px-4 md:px-4 top-20 right-0 z-40 h-screen p-4 overflow-y-auto  bg-white w-[400px] dark:bg-gray-800`}
        tabindex="-1"
        aria-labelledby="drawer-right-label"
      >
        <h5
          id="drawer-right-label"
          class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
        >
          <span className="mx-3">
            <BsRobot />
          </span>
          Bot creator
        </h5>

        
        <button
          type="button"
          data-drawer-hide="drawer-right-example"
          aria-controls="drawer-right-example"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={close}
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
          <span class="sr-only">Close menu</span>
        </button>
        <form class="p-1 md:p-3">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter bot name"
                required=""
              />
            </div>
            <div class="col-span-2">
              <label
                for="agent_id"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Agent ID
              </label>
              <input
                type="text"
                name="agent_id"
                id="agent_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter Agent ID"
                required=""
              />
            </div>
            <div class="col-span-2">
              <label
                for="alias_id"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Agent Alias ID
              </label>
              <input
                type="text"
                name="alias_id"
                id="alias_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter Alias ID"
                required=""
              />
            </div>
          </div>
          <button
            type="button"
            class="py-2 px-5 me-2 mb-2 mt-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};
export default BotCreator;
