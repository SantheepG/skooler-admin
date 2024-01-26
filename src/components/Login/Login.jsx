import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Nav from "./Nav";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobile_no: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      if (formData.mobile_no !== "" && formData.password !== "") {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/login/a",
          {
            mobile_no: formData.mobile_no,
            password: formData.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          //toast.success("Login success");
          if (response.data.admin.is_active === 1) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("admin", JSON.stringify(response.data.admin));
            navigate("/admin");
          } else {
            toast.error("Your account is disabled. Please contact support", {
              duration: 2500,
              position: "top-center",
              //icon: "❌",
            });
          }
        }
      } else {
        console.error("Required fields are empty");
        toast.error("Required fields are empty", {
          duration: 1200,
          position: "top-center",
          //icon: "❌",
        });
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Invalid mobile number or password", {
        duration: 1500,
        position: "top-center",
        //icon: "❌",
      });
    }
  };

  return (
    <React.Fragment>
      <div className="fixed w-full">
        <nav>
          <Nav />
        </nav>
      </div>
      <div class="h-screen py-20 p-4 md:p-20 lg:p-32 ">
        <Toaster className="notifier" />
        <div class="max-w-sm mt-12 lg:mt-8 bg-white rounded-lg overflow-hidden shadow-lg mx-auto box-with-shadow">
          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-2">Admin Login</h2>
            <p class="text-gray-700 mb-6">Please Login in to your account</p>
            <form>
              <div class="mb-4">
                <label
                  class="block text-gray-700 font-bold mb-2"
                  for="username"
                >
                  Phone Number
                </label>
                <input
                  class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="phone_no"
                  id="phone_no"
                  type="text"
                  placeholder="+94 77 712 3456"
                  required=""
                  value={formData.mobile_no}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mobile_no: e.target.value,
                    })
                  }
                />
              </div>
              <div class="mb-6">
                <label
                  class="block text-gray-700 font-bold mb-2"
                  for="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="•••••••••••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div class="flex items-center justify-between">
                <button
                  class="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleLogin}
                >
                  Log In
                </button>
                <a
                  class="inline-block align-baseline font-bold text-sm text-blue-800 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
