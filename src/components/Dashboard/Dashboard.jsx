import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccessDenied from "../AccessDenied";
import UpdateInfo from "./UpdateInfo";
import { FetchStats } from "../../api/SchoolApi";
import { formatDate } from "../../CommonFuncs";
import { formatNumberWithSpace } from "../../CommonFuncs";
import avatar from "../../assets/default-avatar.png";
import { MdOutlineDeleteSweep } from "react-icons/md";
import AddHolidayView from "./AddHolidayView";
import { DeleteHoliday, FetchHolidays } from "../../api/EventApi";
const Dashboard = ({ bool, roles, admin, ui, school }) => {
  const [adminCnt, setAdminCnt] = useState("0");
  const [userCnt, setUserCnt] = useState("0");
  const [orderCnt, setOrderCnt] = useState("0");
  const [productsCnt, setProductCnt] = useState("0");
  const [total, setTotal] = useState("0");
  const [reload, setReload] = useState(true);
  const [holidays, setHolidays] = useState([]);
  const [deleteClicked, setDeleteClicked] = useState(null);
  const [overlayClicked, setOverlayClicked] = useState(false);
  const [addHolidayClicked, setAddHolidayClicked] = useState(false);
  const [updateInfoClicked, setUpdateInfoClicked] = useState(false);

  useEffect(() => {
    const getCounts = async () => {
      try {
        const response = await FetchStats();
        if (response.status === 200) {
          setAdminCnt(response.data.admins_count);
          setOrderCnt(response.data.orders_count);
          setUserCnt(response.data.users_count);
          setProductCnt(response.data.products_count);
          setTotal(response.data.total);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCounts();
  }, []);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await FetchHolidays();
        if (response.status === 200) {
          setHolidays(response.data.holidays);
          setReload(false);
        }
      } catch (error) {
        console.log(error);
        setReload(false);
      }
    };
    fetchHolidays();
  }, [reload]);

  const deleteHoliday = async (id) => {
    try {
      setDeleteClicked(false);
      const response = await DeleteHoliday(id);
      if (response.status === 200) {
        toast.success("deleted", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setReload(!reload);
      } else {
        toast.error("Something went wrong", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <ToastContainer />
      {bool ? (
        <>
          <div className={`${overlayClicked ? "opacity-40" : ""} viewContent`}>
            <div class="p-4 ">
              <div class="mt-12">
                <div class="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                  <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-6 h-6 text-white"
                      >
                        <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                        <path
                          fillRule="evenodd"
                          d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                          clipRule="evenodd"
                        ></path>
                        <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                      </svg>
                    </div>
                    <div class="p-4 text-right">
                      <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                        Total products
                      </p>
                      <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                        {productsCnt}
                      </h4>
                    </div>
                    <div class="border-t border-blue-gray-50 p-4">
                      <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                        <strong class="text-green-500"></strong>
                      </p>
                    </div>
                  </div>
                  <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        class="w-6 h-6 text-white"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div class="p-4 text-right">
                      <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                        Total admins
                      </p>
                      <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                        {adminCnt}
                      </h4>
                    </div>
                    <div class="border-t border-blue-gray-50 p-4">
                      <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                        <strong class="text-green-500"></strong>
                      </p>
                    </div>
                  </div>
                  <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        class="w-6 h-6 text-white"
                      >
                        <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                      </svg>
                    </div>
                    <div class="p-4 text-right">
                      <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                        Total users
                      </p>
                      <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                        {userCnt}
                      </h4>
                    </div>
                    <div class="border-t border-blue-gray-50 p-4">
                      <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                        <strong class="text-red-500"></strong>
                      </p>
                    </div>
                  </div>
                  <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        class="w-6 h-6 text-white"
                      >
                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                      </svg>
                    </div>
                    <div class="p-4 text-right">
                      <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                        Total sales
                      </p>
                      <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                        <span>{school.currency} </span>
                        <span>
                          {" "}
                          {total !== null && formatNumberWithSpace(total)}
                        </span>
                      </h4>
                    </div>
                    <div class="border-t border-blue-gray-50 p-4">
                      <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                        <strong class="text-green-500"></strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                  <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                    <div class="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                      <div>
                        <h6 class="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                          Holidays
                        </h6>
                      </div>
                      <div>
                        <span
                          className="border px-4 py-1 hover:border-blue-400 cursor-pointer rounded-xl"
                          onClick={() => {
                            setOverlayClicked(true);
                            setAddHolidayClicked(true);
                          }}
                        >
                          Add
                        </span>
                      </div>
                    </div>
                    <div class="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                      <table class="w-full min-w-[640px] table-auto">
                        <thead>
                          <tr>
                            <th class="border-b border-blue-gray-50 py-3 px-6 text-left">
                              <p class="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                                Date
                              </p>
                            </th>
                            <th class="border-b border-blue-gray-50 py-3 px-6 text-left">
                              <p class="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                                Info
                              </p>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {holidays.length !== 0 ? (
                            holidays.map((holiday) => (
                              <tr>
                                <td
                                  key={holiday.id}
                                  class="py-3 px-5 border-b border-blue-gray-50"
                                >
                                  <div class="">
                                    <p class="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">
                                      {holiday.date !== null &&
                                        `${
                                          formatDate(holiday.date).split(",")[0]
                                        }, ${
                                          formatDate(holiday.date).split(",")[1]
                                        }`}
                                    </p>
                                    <div class="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                                      <div class="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white"></div>
                                    </div>
                                  </div>
                                </td>

                                <td class="py-3 px-5 border-b border-blue-gray-50">
                                  <p class="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                                    {holiday.name}
                                  </p>
                                </td>

                                <td class="py-5 px-5 border-b border-blue-gray-50 flex">
                                  <p
                                    class="block antialiased font-sans text-xl hover:text-red-600 cursor-pointer font-medium text-blue-gray-600"
                                    onClick={() => {
                                      setDeleteClicked(holiday.id);
                                    }}
                                  >
                                    <MdOutlineDeleteSweep />
                                  </p>
                                  {deleteClicked !== null &&
                                    deleteClicked === holiday.id && (
                                      <p
                                        class="block antialiased border ml-6 mt-0.5 absolute rounded-lg px-2 font-sans text-xs hover:text-red-600 hover:border-red-600 cursor-pointer font-medium text-blue-gray-600"
                                        onClick={() =>
                                          deleteHoliday(holiday.id)
                                        }
                                      >
                                        Delete
                                      </p>
                                    )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className="">
                              <div className="m-4">Nothing available</div>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="max-w-md rounded-xl border bg-white p-6 pb-10 text-gray-900">
                    <div className="w-full text-right text-sm text-gray-400">
                      <span
                        className="border px-4 py-1 hover:border-blue-400 cursor-pointer rounded-xl"
                        onClick={() => {
                          setOverlayClicked(true);
                          setUpdateInfoClicked(true);
                        }}
                      >
                        Edit
                      </span>
                    </div>
                    <div class="relative mx-auto w-36 rounded-full">
                      <img
                        class="mx-auto h-auto w-full rounded-full"
                        src={avatar}
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
                </div>
              </div>

              <div class="text-blue-gray-600">
                <footer class="py-2">
                  <div class="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
                    <p class="block antialiased font-sans text-sm leading-normal font-normal text-inherit">
                      © 2024, Skooler by{" "}
                      <a
                        href="https://www.creative-tim.com"
                        target="_blank"
                        class="transition-colors hover:text-blue-500"
                      >
                        Hologo
                      </a>{" "}
                    </p>
                    <ul class="flex items-center gap-4">
                      <li>
                        <a
                          href="https://hologo.world/"
                          target="_blank"
                          class="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
                        >
                          About Us
                        </a>
                      </li>
                    </ul>
                  </div>
                </footer>
              </div>
            </div>
          </div>
          {overlayClicked && updateInfoClicked && (
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
                  setUpdateInfoClicked(false);
                }}
              />
            </div>
          )}
          {overlayClicked && addHolidayClicked && (
            <div
              id="addAdminModal"
              tabindex="-1"
              aria-hidden="true"
              className={`flex fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full `}
            >
              <AddHolidayView
                fetch={() => {
                  setReload(true);
                }}
                close={() => {
                  setOverlayClicked(false);
                  setAddHolidayClicked(false);
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
