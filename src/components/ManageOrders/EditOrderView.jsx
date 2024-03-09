import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster, toast } from "react-hot-toast";
import { UpdateOrder } from "../../api/OrderApi";
const EditOrderView = ({ closeModal, order, reload }) => {
  const [products, setProducts] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateStr, setSelectedDateStr] = useState("");
  const [selectedDeadline, setSelectedDeadline] = useState("");
  const [deadlineDateStr, setDeadlineDateStr] = useState("");
  const [hour, setHour] = useState("");
  const [mins, setMins] = useState("");

  const [orderData, setOrderData] = useState({
    dispatch_datetime: "",
    dispatch_address: "",
    order_status: "",
  });

  const handleHourChange = (e) => {
    const inputHour = parseInt(e.target.value, 10);

    if (isNaN(inputHour) || inputHour < 0 || inputHour > 23) {
      console.log("Invalid time");
    } else {
      setHour(inputHour.toString().padStart(2, "0"));
    }
  };

  const handleMinChange = (e) => {
    const inputMin = parseInt(e.target.value, 10);

    if (isNaN(inputMin) || inputMin < 0 || inputMin > 59) {
      console.log("Invalid time");
    } else {
      setMins(inputMin.toString().padStart(2, "0"));
    }
  };

  useEffect(() => {
    const addOrderData = () => {
      if (order !== null) {
        setSelectedDate(new Date(order.dispatch_datetime.split(" ")[0]));
        setHour(parseInt(order.dispatch_datetime.split(" ")[1].split(":")[0]));
        setMins(parseInt(order.dispatch_datetime.split(" ")[1].split(":")[1]));
        setOrderData({
          ...orderData,
          dispatch_datetime: order.dispatch_datetime,
          dispatch_address: order.dispatch_address,
          order_status: order.order_status,
        });
      }
    };

    const ParseProducts = () => {
      if (order !== null) {
        let products = JSON.parse(order.products);
        setProducts(products);
      }
    };
    ParseProducts();
    addOrderData();
  }, [order]);

  useEffect(() => {
    const formattedDate = (date) => {
      if (!date || isNaN(date.getTime())) {
        return "";
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      //setSelectedDate(`${year}-${month}-${day}`);
      return `${year}-${month}-${day}`;
    };

    setSelectedDateStr(formattedDate(selectedDate));
  }, [selectedDate]);

  const updateOrder = async () => {
    try {
      if (
        selectedDate !== "" &&
        hour !== "" &&
        mins !== "" &&
        orderData.dispatch_address !== "" &&
        orderData.order_status !== ""
      ) {
        let data = {
          id: order.id,
          dispatch_datetime: `${selectedDateStr} ${hour}:${mins}:00`,
          dispatch_address: orderData.dispatch_address,
          order_status: orderData.order_status,
        };
        const response = await UpdateOrder(data);
        if (response) {
          toast.success("Updated", {
            duration: 1200,
            position: "right-center",
            //icon: "❌",
          });

          setTimeout(() => {
            closeModal();
            reload();
          }, 1500);
        }
      } else {
        toast.error("Required fields are empty", {
          duration: 1200,
          position: "right-center",
          //icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid inputs. Please check", {
        duration: 1500,
        position: "right-center",
        //icon: "❌",
      });
    }
  };
  return (
    <React.Fragment>
      {order ? (
        <div class="relative w-full max-w-xl max-h-full">
          <form class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <Toaster className="notifier z-100" />
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Update order details
                <div className="text-xs text-gray-500">
                  Order ID : # {order.id} | Order type : {order.order_type}
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
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-7 sm:col-span-3">
                  <div className="">
                    <label
                      for="weight"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {order.order_type === "delivery"
                        ? "Delivery date"
                        : "Pick-up date"}
                    </label>
                    <DatePicker
                      selected={selectedDate}
                      className="lg:w-64 md:w-56 w-64 rounded border border-gray-300 "
                      onChange={(date) => {
                        setSelectedDate(date);
                      }}
                    />
                  </div>
                  <div className="mt-2">
                    <label
                      for="length"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {order.order_type === "delivery"
                        ? "Delivery time"
                        : "Pick-up time"}
                    </label>
                    <div className="flex w-full">
                      <input
                        type="number"
                        name="hour1"
                        id="hour1"
                        min={0}
                        max={23}
                        value={hour}
                        onChange={(e) => handleHourChange(e)}
                        className="mr-1 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                      <div className="text-3xl"> : </div>
                      <input
                        type="number"
                        name="mins1"
                        id="mins1"
                        min={0}
                        max={59}
                        value={mins}
                        onChange={(e) => handleMinChange(e)}
                        class="ml-2 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="last-name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Order status
                  </label>
                  <select
                    id="category"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={(e) =>
                      setOrderData({
                        ...orderData,
                        order_status: e.target.value,
                      })
                    }
                  >
                    <option
                      value="Delivered"
                      selected={order.order_status === "Delivered"}
                    >
                      Delivered
                    </option>
                    <option
                      value="Processing"
                      selected={order.order_status === "Processing"}
                    >
                      Processing
                    </option>
                    <option
                      value="Ready for pick-up"
                      selected={order.order_status === "Ready for pick-up"}
                    >
                      Ready for pick-up
                    </option>
                    <option
                      value="Dispatched"
                      selected={order.order_status === "Dispatched"}
                    >
                      Dispatched
                    </option>
                    <option
                      value="Cancelled"
                      selected={order.order_status === "Cancelled"}
                    >
                      Cancelled
                    </option>
                    <option
                      value="Declined"
                      selected={order.order_status === "Declined"}
                    >
                      Declined
                    </option>
                  </select>
                </div>
                <div class="sm:col-span-6">
                  <label
                    for="description"
                    class="block ml-1 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {order.order_type === "delivery"
                      ? "Delivery address"
                      : "Pick-up address"}
                  </label>
                  <textarea
                    disabled={order.order_type === "delivery"}
                    id="venue"
                    rows="2"
                    class="block mt-6 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={orderData.dispatch_address}
                    onChange={(e) =>
                      setOrderData({
                        ...orderData,
                        dispatch_address: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-center w-full space-x-2 pb-4">
              {" "}
              <button
                type="button"
                class="py-2.5 px-8 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:outline-none focus:ring-gray-700 focus:text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                onClick={updateOrder}
              >
                Update
              </button>
              <button
                data-modal-toggle="createProductModal"
                type="button"
                class="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => {
                  closeModal();
                }}
              >
                <svg
                  class="mr-1 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                Discard
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default EditOrderView;
