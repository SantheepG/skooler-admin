import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import AccessDenied from "../AccessDenied";
import UpdateInfo from "./UpdateInfo";
import { FetchStats } from "../../api/SchoolApi";
const Dashboard = ({ bool, roles, admin }) => {
  const [adminCnt, setAdminCnt] = useState("0");
  const [userCnt, setUserCnt] = useState("0");
  const [orderCnt, setOrderCnt] = useState("0");

  const [overlayClicked, setOverlayClicked] = useState(false);

  useEffect(() => {
    const getCounts = async () => {
      try {
        const response = await FetchStats();
        if (response.status === 200) {
          setAdminCnt(response.data.admins_count);
          setOrderCnt(response.data.orders_count);
          setUserCnt(response.data.users_count);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCounts();
  }, []);
  return (
    <React.Fragment>
      {bool ? (
        <>
          <div
            className={`${
              overlayClicked ? "opacity-40" : ""
            } dashboard-container`}
          >
            <div className="w-full">
              <div class="flex flex-wrap gap-x-24 gap-y-12 bg-gray-100 px-4 mt-12 lg:px-20">
                <div class="flex w-72">
                  <div class="flex w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
                    <div class="p-3">
                      <div class="absolute -mt-10 h-16 w-16 rounded-xl bg-gradient-to-tr from-gray-700 to-gray-400 text-center text-white shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="mt-4 h-7 w-16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div class="pt-1 text-right">
                        <p class="text-sm font-light capitalize">Admins</p>
                        <h4 class="text-2xl font-semibold tracking-tighter xl:text-2xl">
                          {adminCnt}
                        </h4>
                      </div>
                      <hr class="opacity-50" />
                    </div>
                    <hr class="opacity-50" />
                  </div>
                </div>
                <div class="flex w-72">
                  <div class="flex w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
                    <div class="p-3">
                      <div class="absolute -mt-10 h-16 w-16 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 text-center text-white shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="mt-4 h-7 w-16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div class="pt-1 text-right">
                        <p class="text-sm font-light capitalize">Users</p>
                        <h4 class="text-2xl font-semibold tracking-tighter xl:text-2xl">
                          {userCnt}
                        </h4>
                      </div>
                      <hr class="opacity-50" />
                    </div>
                  </div>
                </div>
                <div class="flex w-72">
                  <div class="flex w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
                    <div class="p-3">
                      <div class="absolute -mt-10 h-16 w-16 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 text-center text-white shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="mt-4 h-7 w-16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div class="pt-1 text-right">
                        <p class="text-sm font-light capitalize">Orders</p>
                        <h4 class="text-2xl font-semibold tracking-tighter xl:text-2xl">
                          {orderCnt}
                        </h4>
                      </div>
                      <hr class="opacity-50" />
                    </div>
                    <hr class="opacity-50" />
                  </div>
                </div>
              </div>
            </div>
            <div class="">
              <div class="grid grid-cols-1 gap-5 bg-gray-100 p-2 sm:grid-cols-2 sm:p-10 lg:grid-cols-3">
                <div class="max-w-md rounded-xl border bg-white p-6 pb-10 text-gray-900">
                  <p class="text-lg font-medium">Slideshow</p>
                  <div class="flex items-center py-2">
                    <img
                      class="h-10 w-10 rounded-full object-cover"
                      src="/images/y9s3xOJV6rnQPKIrdPYJy.png"
                      alt="Simon Lewis"
                    />
                    <p class="ml-4 w-56">
                      <strong class="block font-medium">
                        Albert Mcalister
                      </strong>
                      <span class="text-xs text-gray-400">
                        {" "}
                        Commented on{" "}
                        <a
                          class="truncate font-medium text-indigo-600"
                          href="#"
                        >
                          An Evening in the Woods
                        </a>{" "}
                      </span>
                    </p>
                  </div>
                  <div class="flex items-center py-2">
                    <img
                      class="h-10 w-10 rounded-full object-cover"
                      src="/images/fR71TFZIDTv2jhvKsOMhC.png"
                      alt=""
                    />
                    <p class="ml-4 w-56">
                      <strong class="block font-medium">Samantha Ribbon</strong>
                      <span class="text-xs text-gray-400">
                        {" "}
                        Commented on{" "}
                        <a
                          class="truncate font-medium text-indigo-600"
                          href="#"
                        >
                          An Evening in the Woods
                        </a>{" "}
                      </span>
                    </p>
                  </div>
                  <div class="flex items-center py-2">
                    <img
                      class="h-10 w-10 rounded-full object-cover"
                      src="/images/R-Wx_NHvZBci3KLrgXhp1.png"
                      alt=""
                    />
                    <p class="ml-4 w-56">
                      <strong class="block font-medium">Dr. Kayla</strong>
                      <span class="text-xs text-gray-400">
                        {" "}
                        Commented on{" "}
                        <a
                          class="truncate font-medium text-indigo-600"
                          href="#"
                        >
                          An Evening in the Woods
                        </a>{" "}
                      </span>
                    </p>
                  </div>
                </div>
                <div class="max-w-md rounded-xl border bg-white p-6 pb-10 text-gray-900">
                  <div className="w-full text-right text-sm text-gray-400">
                    <span
                      className="border px-4 py-1 hover:border-blue-400 cursor-pointer rounded-xl"
                      onClick={() => setOverlayClicked(true)}
                    >
                      Edit
                    </span>
                  </div>
                  <div class="relative mx-auto w-36 rounded-full">
                    <img
                      class="mx-auto h-auto w-full rounded-full"
                      src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                      alt=""
                    />
                  </div>
                  <h1 class=" text-center text-lg font-bold leading-8 text-gray-900">
                    {admin.first_name} {admin.last_name}
                  </h1>
                  <h3 class="font-lg text-sm text-semibold text-center leading-6 text-gray-600">
                    {admin.mobile_no} | {admin.email}
                  </h3>
                  <span className="text-xs mx-6 text-gray-500 dark:text-gray-400 flex flex-wrap overflow-auto items-center justify-center">
                    {" "}
                    {roles.length !== 0
                      ? roles.map((role, index) => (
                          <span
                            key={index}
                            className="w-1/7 px-1 ml-1 mt-1 border border-gray-300 rounded text-gray-400 whitespace-nowrap overflow-hidden overflow-ellipsis"
                          >
                            {role}
                          </span>
                        ))
                      : null}
                  </span>
                  <ul class="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                    <li class="flex items-center py-3 text-sm">
                      <span>Joined on</span>
                      <span class="ml-auto">
                        {admin.created_at !== null &&
                          admin.created_at.split("T")[0]}
                      </span>
                    </li>
                  </ul>
                </div>

                <div class="max-w-md rounded-xl border bg-white p-6 pb-10 text-gray-900">
                  <p class="text-lg font-medium">Traffic Sources</p>
                  <div class="mt-4">
                    <p class="float-left mb-2">Direct</p>
                    <span class="float-right mb-2">20,00</span>
                    <div class="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                      <div class="h-full w-10/12 overflow-hidden rounded-full bg-indigo-600"></div>
                    </div>
                  </div>
                  <div class="mt-4">
                    <p class="float-left mb-2">Referral</p>
                    <span class="float-right mb-2">2,000</span>
                    <div class="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                      <div class="h-full w-4/12 overflow-hidden rounded-full bg-indigo-600"></div>
                    </div>
                  </div>
                  <div class="mt-4">
                    <p class="float-left mb-2">Google</p>
                    <span class="float-right mb-2">1,500</span>
                    <div class="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                      <div class="h-full w-3/12 overflow-hidden rounded-full bg-indigo-600"></div>
                    </div>
                  </div>
                  <div class="mt-4">
                    <p class="float-left mb-2">Facebook</p>
                    <span class="float-right mb-2">260</span>
                    <div class="h-1.5 w-full overflow-hidden rounded-full bg-gray-50">
                      <div class="h-full w-1/12 overflow-hidden rounded-full bg-indigo-600"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {overlayClicked && (
            <div
              id="addAdminModal"
              tabindex="-1"
              aria-hidden="true"
              className={`flex fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full `}
            >
              <UpdateInfo
                admin={admin}
                close={() => {
                  setOverlayClicked(false);
                }}
              />
            </div>
          )}
        </>
      ) : (
        <AccessDenied />
      )}
    </React.Fragment>
  );
};

export default Dashboard;
