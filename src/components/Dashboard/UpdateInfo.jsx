import React, { useState, useEffect } from "react";
import { UpdatePwd } from "../../api/AuthAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UpdateName } from "../../api/AuthAPI";
import { useAppContext } from "../../AppContext";
const UpdateInfo = ({ close }) => {
  const { admin } = useAppContext();
  const [fname, setFname] = useState("");
  const [surname, setSurname] = useState("");
  const [pwdClicked, setPwdClicked] = useState(false);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  useEffect(() => {
    if (admin) {
      setFname(admin.first_name);
      setSurname(admin.last_name);
    }
  }, [admin]);

  const updatePwd = async () => {
    try {
      if (currentPwd !== "" && newPwd !== "" && confirmPwd !== "") {
        if (newPwd === confirmPwd) {
          const response = await UpdatePwd({
            id: admin.id,
            current_password: currentPwd,
            new_password: newPwd,
          });
          if (response.status === 200) {
            toast.success("Password updated", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            setPwdClicked(false);
          } else if (response.status === 401) {
            toast.error("Current password is incorrect", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          } else {
            toast.error("Something went wrong", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        } else {
          toast.error("Passwords didn't match", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } else {
        toast.error("Required fields are empty", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  const updateName = async () => {
    const response = await UpdateName({
      id: admin.id,
      first_name: fname,
      last_name: surname,
    });
    if (response.status === 200) {
      toast.success("Updated", {
        position: "bottom-right",
      });
      setTimeout(() => {
        close();
      }, 1500);
    } else {
      toast.error("Something went wrong. Please try again", {
        position: "bottom-right",
      });
    }
    try {
    } catch (error) {
      toast.error("Something went wrong. Please try again", {
        position: "bottom-right",
      });
      console.log(error);
    }
  };
  return (
    <div className="my-4  bg-white max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
      <ToastContainer />
      <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
        <div className="shrink-0 mr-auto sm:py-3">
          <p className="font-medium">Account Details</p>
          <p className="text-sm text-gray-600">Edit your account details</p>
        </div>
        <button
          className="mr-2 hidden rounded-lg border-2 px-4 py-1 text-sm text-gray-500 sm:inline focus:outline-none focus:ring hover:bg-gray-200"
          onClick={close}
        >
          Cancel
        </button>
        <button
          className="mr-2 hidden rounded-lg border-2 px-4 py-1 text-sm text-gray-500 sm:inline focus:outline-none focus:ring hover:bg-gray-200"
          onClick={updateName}
        >
          Save
        </button>
      </div>
      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Name</p>
        <input
          placeholder="First Name"
          className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <input
          placeholder="Last Name"
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Email</p>
        <input
          disabled
          placeholder="your.email@domain.com"
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          value={admin.email}
        />
      </div>
      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Phone number</p>
        <input
          disabled
          placeholder="Phone number"
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          value={admin.mobile_no}
        />
      </div>
      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Password</p>
        <button
          className="border rounded-2xl px-4 py-2 hover:bg-gray-200"
          onClick={() => setPwdClicked(!pwdClicked)}
        >
          Change password
        </button>
      </div>
      {pwdClicked && (
        <>
          <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
            <p className="shrink-0 w-32 font-medium">Current password</p>
            <input
              type="password"
              placeholder="********"
              className="mb-2 w-full rounded-md border border-gray-300 bg-white px-2 py-1 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
              value={currentPwd}
              onChange={(e) => setCurrentPwd(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
            <p className="shrink-0 w-32 font-medium">New password</p>
            <input
              type="password"
              placeholder="********"
              className="mb-2 w-full rounded-md border border-gray-300 bg-white px-2 py-1 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
            <p className="shrink-0 w-32 font-medium">Confirm password</p>
            <input
              type="password"
              placeholder="********"
              className="mb-2 w-full rounded-md border border-gray-300 bg-white px-2 py-1 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
            />
            <button
              className="border px-4 mx-4 rounded-2xl"
              onClick={updatePwd}
            >
              Update
            </button>
          </div>
        </>
      )}
      <div className="flex justify-end py-4 sm:hidden">
        <button
          className="mr-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 focus:outline-none focus:ring hover:bg-gray-200"
          onClick={close}
        >
          Cancel
        </button>
        <button
          className="rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700"
          onClick={updateName}
        >
          Save
        </button>
      </div>
    </div>
  );
};
export default UpdateInfo;
