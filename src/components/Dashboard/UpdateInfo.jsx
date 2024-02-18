import React, { useState, useEffect } from "react";

const UpdateInfo = ({ admin, close }) => {
  const [fname, setFname] = useState("");
  const [surname, setSurname] = useState("");

  useEffect(() => {
    if (admin) {
      setFname(admin.first_name);
      setSurname(admin.last_name);
    }
  }, [admin]);

  const updateName = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class="my-4  bg-white max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
      <div class="flex flex-col border-b py-4 sm:flex-row sm:items-start">
        <div class="shrink-0 mr-auto sm:py-3">
          <p class="font-medium">Account Details</p>
          <p class="text-sm text-gray-600">Edit your account details</p>
        </div>
        <button
          className="mr-2 hidden rounded-lg border-2 px-4 py-2 font-medium text-gray-500 sm:inline focus:outline-none focus:ring hover:bg-gray-200"
          onClick={close}
        >
          Cancel
        </button>
        <button class="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-blue-700">
          Save
        </button>
      </div>
      <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <p class="shrink-0 w-32 font-medium">Name</p>
        <input
          placeholder="First Name"
          class="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <input
          placeholder="Last Name"
          class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
      <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <p class="shrink-0 w-32 font-medium">Email</p>
        <input
          disabled
          placeholder="your.email@domain.com"
          class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          value={admin.email}
        />
      </div>

      <div class="flex justify-end py-4 sm:hidden">
        <button class="mr-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 focus:outline-none focus:ring hover:bg-gray-200">
          Cancel
        </button>
        <button class="rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700">
          Save
        </button>
      </div>
    </div>
  );
};
export default UpdateInfo;
