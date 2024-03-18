import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./Nav";
import PwdReset from "./PwdReset";
import { AdminLogin } from "../../api/AuthAPI";
import { loginSchema } from "../../validations";

const Login = ({ ui, school }) => {
  const navigate = useNavigate();
  const [forgetPwdClicked, setForgetPwdClicked] = useState(false);
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [phoneToLogin, setPhoneToLogin] = useState("");

  useEffect(() => {
    let newNumber;
    if (phone && phone.length > 1 && phone[0] === "0") {
      newNumber = school.country_code + phone.substring(1);
    } else if (phone && phone.length > 1 && phone[0] === "+") {
      newNumber = phone;
    } else {
      newNumber = school.country_code + phone;
    }
    console.log(phone);
    setPhoneToLogin(newNumber);
    console.log(phoneToLogin);
  }, [phone]);

  const handleLogin = async () => {
    try {
      await loginSchema.validate(
        {
          mobile_no: phone,
          password: pwd,
        },
        { abortEarly: false }
      );
      const response = await AdminLogin({
        mobile_no: phoneToLogin,
        password: pwd,
      });
      if (response.status === 200) {
        if (response.data.admin.is_active === 1) {
          localStorage.setItem("tkn", response.data.token);
          localStorage.setItem("admin", JSON.stringify(response.data.admin));
          navigate("/admin");
        } else {
          toast.error("Your account is disabled. Please contact support", {
            position: "bottom-right",
          });
        }
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        toast.error(error.errors[0], {
          position: "bottom-right",
        });
      } else {
        // Handle other errors
        toast.error("Something went wrong", {
          position: "bottom-right",
        });
      }
    }
  };

  return (
    <React.Fragment>
      <div className="fixed w-full">
        <nav>
          <Nav ui={ui} school={school} />
        </nav>
      </div>
      <div className={`h-screen py-20 p-4 md:p-20 lg:p-32`}>
        <ToastContainer />
        {!forgetPwdClicked && (
          <div
            className={`border-t-8 border-${ui.secondary_clr} max-w-sm mt-12 lg:mt-8 bg-white rounded-lg overflow-hidden shadow-lg mx-auto box-with-shadow`}
          >
            <div class="p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-2">Admin Login</h2>
              <p class="text-gray-700 mb-6">Please Login in to your account</p>
              <form className="animate-slide-in-from-right ">
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
                    placeholder="Phone number"
                    required=""
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                  />
                </div>
                <div class="flex items-center justify-between">
                  <button
                    class={`border border-${ui.secondary_clr} hover:text-gray-600 hover:shadow font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline`}
                    type="button"
                    onClick={handleLogin}
                  >
                    Log In
                  </button>
                  <a
                    class="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-blue-800"
                    href="#"
                    onClick={() => setForgetPwdClicked(true)}
                  >
                    Forgot Password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        )}
        {forgetPwdClicked && (
          <PwdReset
            loginClicked={() => {
              setForgetPwdClicked(false);
            }}
            ui={ui}
            school={school}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Login;
