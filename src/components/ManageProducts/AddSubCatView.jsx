import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AddSubcategory } from "../../api/ProductApi";

const AddSubCatView = ({
  closeModal,
  category,
  subcategory,
  setReloadComponent,
}) => {
  const [subCatName, setSubCatName] = useState("");
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedCategoryID, setSelectedCategoryID] = useState(0);
  const [addSubCatData, setAddSubCatData] = useState({
    category_id: null,
    name: "",
  });

  const handleCategoryChange = (event) => {
    setFilteredSubcategories([]);
    console.log(category);
    const selectedCat = category.filter(
      (item) => item.id === parseInt(event.target.value)
    );
    console.log(selectedCat);
    setAddSubCatData({
      ...addSubCatData,
      category_id: parseInt(event.target.value),
    });
    setSelectedCategory(selectedCat[0]);
    setSelectedCategoryID(selectedCat[0].id);

    const filteredData = subcategory.filter(
      (item) => item.category_id === parseInt(selectedCat[0].category_id)
    );

    if (filteredData.length === 0) {
      setFilteredSubcategories([]);
    } else {
      setFilteredSubcategories(filteredData);
    }
  };

  const addSubCategory = async () => {
    if (subCatName !== "" && selectedCategory.length !== 0) {
      const nameCheck = filteredSubcategories.filter(
        (item) => item.name.toLowerCase() === subCatName.toLowerCase()
      );
      if (nameCheck.length === 0) {
        try {
          let data = {
            category_id: selectedCategoryID,
            name: subCatName,
          };
          const response = await AddSubcategory(data);
          if (response.status === 201) {
            toast.success("Added", {
              duration: 1000,
              position: "right-center",
              //icon: "❌",
            });

            setTimeout(() => {
              closeModal();
              setReloadComponent(true);
            }, 1200);
          } else {
            toast.error("Required field is empty");
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Subcategory with the same name exists");
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
              Add Subcategory
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
            <div>
              <label
                for="category"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category *
              </label>
              <select
                id="category"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={(e) => handleCategoryChange(e)}
              >
                <option value="" disabled selected>
                  Choose Category
                </option>

                {category.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div class="mt-3">
              <div class="space-y-4 sm:space-y-6">
                <div>
                  <label
                    for="category-name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter Subcategory name *
                  </label>
                  <input
                    type="text"
                    name="category-name"
                    id="category-name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={(e) => setSubCatName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              class="py-1.5 my-2 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:outline-none focus:ring-gray-700 focus:text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              onClick={() => addSubCategory()}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default AddSubCatView;
