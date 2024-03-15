import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VerifyAdminPhone, CheckOtp, RecoverAccount } from "../../api/AuthAPI";
import * as yup from "yup";

const pwdSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password  is required")
    .min(8, "Password must be at least 8 characters long"),
});
const PwdReset = ({ loginClicked, ui, school }) => {
  const [phoneNo, setPhoneNo] = useState("");
  const [actualNumber, setActualNumber] = useState("");
  const [viewSpinner, setViewSpinner] = useState(false);
  const [viewOtpFields, setViewOtpFields] = useState(false);
  const [viewPwdFields, setViewPwdFields] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [inputValues, setInputValues] = useState(["", "", "", "", "", ""]);
  const [otpNo, setOtpNo] = useState("");
  const inputs = useRef([]);

  useEffect(() => {
    const concatenatedValue = inputValues.join("");
    setOtpNo(concatenatedValue);
  }, [inputValues]);
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      if (inputValues[index] === "" && index > 0) {
        event.preventDefault();
        inputs.current[index - 1].focus();
      }
    }
  };
  const handleChange = (index, event) => {
    const value = event.target.value;
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
    if (value !== "" && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };
  useEffect(() => {
    let newNumber;
    if (phoneNo && phoneNo.length > 1 && phoneNo[0] === "0") {
      newNumber = school.country_code + phoneNo.substring(1);
    } else if (phoneNo && phoneNo.length > 1 && phoneNo[0] === "+") {
      newNumber = phoneNo;
    } else {
      newNumber = school.country_code + phoneNo;
    }
    setActualNumber(newNumber);
  }, [phoneNo]);

  const verifyAdminPhone = async () => {
    try {
      const response = await VerifyAdminPhone(actualNumber);
      if (response.status === 422) {
        toast.error("Invalid Phone Number", {
          position: "bottom-right",
        });
        setViewOtpFields(true);
        setViewSpinner(false);
      } else if (response.status === 200) {
        toast("A verification code has been sent to your number", {
          position: "bottom-right",
        });
        setViewOtpFields(true);
        setViewSpinner(false);
      } else {
        toast.error("Something went wrong. Please try again", {
          position: "bottom-right",
        });
        setViewSpinner(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again", {
        position: "bottom-right",
      });
      setViewSpinner(false);
    }
  };
  const checkOTP = async () => {
    try {
      const response = await CheckOtp(actualNumber, otpNo);
      if (response && response.data.verified) {
        setViewSpinner(false);
        setViewPwdFields(true);
      } else {
        toast.error("Invalid OTP, please try again", {
          position: "bottom-right",
        });
        setViewSpinner(false);
        setInputValues(["", "", "", "", "", ""]);
      }
    } catch (error) {
      console.log(error);
      setViewSpinner(false);
      setInputValues(["", "", "", "", "", ""]);
      loginClicked();
      toast.error("Verification failed, please try again", {
        position: "bottom-right",
      });
    }
  };
  const updatePwd = async () => {
    if (newPwd === confirmPwd) {
      try {
        await pwdSchema.validate(
          {
            password: newPwd,
          },
          { abortEarly: false }
        );
        const response = await RecoverAccount(actualNumber, newPwd);
        if (response.status === 200) {
          toast.success("Password updated", {
            position: "bottom-right",
          });
          setViewSpinner(false);
          setTimeout(() => {
            loginClicked();
          }, 2000);
        }
      } catch (error) {
        if (error.name === "ValidationError") {
          setViewSpinner(false);
          toast.error(error.errors[0], {
            position: "bottom-right",
          });
        } else {
          setViewSpinner(false);
          toast.error("Something went wrong", {
            position: "bottom-right",
          });
          setTimeout(() => {
            loginClicked();
          }, 2000);
        }
        setViewSpinner(false);
      }
    } else {
      toast.error("Password didn't match. Please check", {
        position: "bottom-right",
      });
      setViewSpinner(false);
    }
  };
  return (
    <>
      <ToastContainer />

      {!viewOtpFields && !viewPwdFields && (
        <>
          <div
            className={`border-t-8 border-${ui.secondary_clr} max-w-sm mt-12 lg:mt-8 bg-white rounded-lg overflow-hidden shadow-lg mx-auto box-with-shadow`}
          >
            <div class="p-6">
              <form>
                <div class="mt-12 mb-36">
                  <label
                    class="block text-gray-700 font-bold mb-10"
                    for="username"
                  >
                    Enter your phone number
                  </label>
                  <input
                    class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="phone_no"
                    id="phone_no"
                    type="text"
                    placeholder="Phone number"
                    required=""
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </div>

                <div class="flex items-center justify-between">
                  <button
                    class={`border border-${ui.secondary_clr} hover:text-gray-600 hover:shadow font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline`}
                    type="button"
                    onClick={() => {
                      setViewSpinner(true);
                      verifyAdminPhone();
                    }}
                  >
                    {viewSpinner && (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span class="sr-only"></span>
                      </div>
                    )}
                    {!viewSpinner && "Next"}
                  </button>
                  <a
                    class="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-blue-800"
                    href="#"
                    onClick={loginClicked}
                  >
                    Back to login
                  </a>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      {viewOtpFields && !viewPwdFields && (
        <>
          <div
            className={`border-t-8 border-${ui.secondary_clr} max-w-sm mt-12 lg:mt-8 bg-white rounded-lg overflow-hidden shadow-lg mx-auto box-with-shadow`}
          >
            <div class="p-6">
              <form>
                <div class="mt-12 mb-36">
                  <label
                    class="block text-gray-700 font-bold mb-10"
                    for="username"
                  >
                    A verification code has been sent to{" "}
                    {actualNumber.substring(0, 5)}
                    *****
                  </label>
                  <div className="flex justify-center gap-2 mb-6">
                    {inputValues.map((value, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputs.current[index] = el)}
                        className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        type="text"
                        maxLength="1"
                        pattern="[0-9]"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        required
                        value={value}
                        onKeyDown={(event) => handleKeyDown(index, event)}
                        onChange={(event) => handleChange(index, event)}
                      />
                    ))}
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <button
                    class={`border border-${ui.secondary_clr} hover:text-gray-600 hover:shadow font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline`}
                    type="button"
                    onClick={() => {
                      setViewSpinner(true);
                      checkOTP();
                    }}
                  >
                    {viewSpinner && (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span class="sr-only"></span>
                      </div>
                    )}
                    {!viewSpinner && "Verify"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      {viewOtpFields && viewPwdFields && (
        <>
          <div
            className={`border-t-8 border-${ui.secondary_clr} max-w-sm mt-12 lg:mt-8 bg-white rounded-lg overflow-hidden shadow-lg mx-auto box-with-shadow`}
          >
            <div class="p-6">
              <form>
                <div class="mt-12 mb-36">
                  <label
                    class="block text-gray-700 font-bold mb-10"
                    for="username"
                  >
                    Enter a strong password to secure your account
                  </label>
                  <div className=" gap-2 mb-6">
                    <input
                      class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="new_pwd"
                      id="new_pwd"
                      type="password"
                      placeholder="New password"
                      required=""
                      value={newPwd}
                      onChange={(e) => setNewPwd(e.target.value)}
                    />
                    <input
                      class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="confirm_pwd"
                      id="confrim_pwd"
                      type="password"
                      placeholder="Confirm password"
                      required=""
                      value={confirmPwd}
                      onChange={(e) => setConfirmPwd(e.target.value)}
                    />
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <button
                    class={`border border-${ui.secondary_clr} hover:text-gray-600 hover:shadow font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline`}
                    type="button"
                    onClick={() => {
                      setViewSpinner(true);
                      updatePwd();
                    }}
                  >
                    {viewSpinner && (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span class="sr-only"></span>
                      </div>
                    )}
                    {!viewSpinner && "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default PwdReset;
