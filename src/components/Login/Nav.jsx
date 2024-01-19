import React from "react";

const Nav = () => {
  return (
    <React.Fragment>
      <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div class="flex flex-shrink-0 items-center">
                {" "}
                <a
                  href="#"
                  class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                  aria-current="page"
                >
                  School logo
                </a>
              </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div class=" ml-3">
                <div>
                  <div class="hidden sm:ml-6 sm:block">
                    <div class="flex space-x-4">
                      <a
                        href="#"
                        class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                        aria-current="page"
                      >
                        Skooler
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
