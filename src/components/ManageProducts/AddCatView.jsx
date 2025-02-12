import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AddCategory } from "../../api/ProductApi";

const AddCatView = ({ closeModal, categories, setReloadComponent }) => {
  const [category, setCategory] = useState("");

  const addCategory = async () => {
    if (category !== "") {
      const nameCheck = categories.filter(
        (item) => item.name.toLowerCase() === category.toLowerCase()
      );
      if (nameCheck.length === 0) {
        try {
          const response = await AddCategory(category);
          if (response.status === 201) {
            toast.success("Added", {
              duration: 1200,
              position: "right-center",
              //icon: "❌",
            });

            setTimeout(() => {
              closeModal();
              setReloadComponent();
            }, 1500);
          } else {
            toast.error("Required field is empty");
            closeModal();
            setReloadComponent();
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        toast.error("Category with the same name exists");
      }
    } else {
      toast.error("Required field is empty");
    }
  };
  return (
    <React.Fragment>
      <div class="relative w-full max-w-xs max-h-full">
        <Toaster className="notifier" />

        <form class="animate-view-content relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Add category
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
                  <a href="#">Close modal</a>
                </span>
              </button>
            </div>
          </div>
          <div className="p-4 h-56 overflow-y-auto w-full">
            <div class="mt-2">
              <div class="space-y-4 sm:space-y-6">
                <div>
                  <label
                    for="category-name"
                    class="block mb-6 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter category name
                  </label>
                  <input
                    type="text"
                    name="category-name"
                    id="category-name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              class="py-2.5 my-6 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:outline-none focus:ring-gray-700 focus:text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              onClick={() => addCategory()}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default AddCatView;
