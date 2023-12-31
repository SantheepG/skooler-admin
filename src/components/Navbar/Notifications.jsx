import React, { useState, useEffect } from "react";
import defaultImg from "../../assets/default-avatar.png";
import "./Notifications.css";

const Notifications = () => {
  return (
    <React.Fragment>
      <div
        class="SlideDown overflow-hidden z-50 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700"
        id="notification-dropdown"
      >
        <div class="py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          Notifications
        </div>
        <div class="h-80 overflow-y-auto">
          <a
            href="#"
            class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
          >
            <div class="flex-shrink-0">
              <img
                class="w-11 h-11 rounded-full"
                src={defaultImg}
                alt="Bonnie Green avatar"
              />
              <div class="flex relative justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700">
                <svg
                  class="w-2 h-2 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />
                  <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                </svg>
              </div>
            </div>
            <div class="pl-3 w-full">
              <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                We would like to hear from you :{" "}
                <span class="font-semibold text-gray-900 dark:text-white">
                  How was your last purchase ?
                </span>{" "}
                :{" "}
                <a href="" className="text-blue-500">
                  Review
                </a>
              </div>
              <div class="text-xs font-medium text-primary-700 dark:text-primary-400">
                a few moments ago
              </div>
            </div>
          </a>
          <a
            href="#"
            class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
          >
            <div class="flex-shrink-0">
              <img
                class="w-11 h-11 rounded-full"
                src={defaultImg}
                alt="Jese Leos avatar"
              />
              <div class="flex relative  justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-700">
                <svg
                  class="w-2 h-2 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                </svg>
              </div>
            </div>
            <div class="pl-3 w-full">
              <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                <span class="font-semibold text-gray-900 dark:text-white">
                  Order ID - 1234
                </span>{" "}
                has been dispatched.{" "}
                <span class="font-medium text-gray-900 dark:text-white">
                  You may recieve your order by tommorrow.
                </span>{" "}
                <a href="" className="text-blue-500">
                  Track your order
                </a>
              </div>
              <div class="text-xs font-medium text-primary-700 dark:text-primary-400">
                10 minutes ago
              </div>
            </div>
          </a>
          <a
            href="#"
            class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
          >
            <div class="flex-shrink-0">
              <img
                class="w-11 h-11 rounded-full"
                src={defaultImg}
                alt="Joseph McFall avatar"
              />
              <div class="flex relative  justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white dark:border-gray-700">
                <svg
                  class="w-2 h-2 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  {" "}
                  <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />{" "}
                </svg>
              </div>
            </div>
            <div class="pl-3 w-full">
              <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                <span class="font-semibold text-gray-900 dark:text-white">
                  Thank you for your valuable review.
                </span>{" "}
                <span class="font-medium text-gray-900 dark:text-white">
                  Happy shopping
                </span>{" "}
              </div>
              <div class="text-xs font-medium text-primary-700 dark:text-primary-400">
                44 minutes ago
              </div>
            </div>
          </a>
          <a
            href="#"
            class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
          >
            <div class="flex-shrink-0">
              <img
                class="w-11 h-11 rounded-full"
                src={defaultImg}
                alt="Roberta Casas image"
              />
              <div class="flex relative  justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white dark:border-gray-700">
                <svg
                  class="w-2 h-2 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                </svg>
              </div>
            </div>
            <div class="pl-3 w-full">
              <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                <span class="font-semibold text-gray-900 dark:text-white">
                  Complaint ID - 3344 :
                </span>{" "}
                Your complainted has been recorded:{" "}
                <span class="font-medium text-primary-700 dark:text-primary-500">
                  We will get back to you shortly
                </span>{" "}
              </div>
              <div class="text-xs font-medium text-primary-700 dark:text-primary-400">
                1 hour ago
              </div>
            </div>
          </a>
          <a
            href="#"
            class="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <div class="flex-shrink-0">
              <img
                class="w-11 h-11 rounded-full"
                src={defaultImg}
                alt="Robert image"
              />
              <div class="flex relative  justify-center items-center ml-6 -mt-5 w-5 h-5 bg-purple-500 rounded-full border border-white dark:border-gray-700">
                <svg
                  class="w-2 h-2 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 14"
                >
                  <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
                </svg>
              </div>
            </div>
            <div class="pl-3 w-full">
              <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                <span class="font-semibold text-gray-900 dark:text-white">
                  A new event has been added
                </span>{" "}
                Checkout for more information.{" "}
                <a href="" className="text-blue-500">
                  View
                </a>
              </div>
              <div class="text-xs font-medium text-primary-700 dark:text-primary-400">
                yesterday
              </div>
            </div>
          </a>
        </div>
        <a
          href="#"
          class="block py-2 text-base font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline"
        >
          <div class="inline-flex items-center "></div>
        </a>
      </div>
    </React.Fragment>
  );
};

export default Notifications;
