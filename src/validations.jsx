import * as yup from "yup";
//Admin login & pwd reset
export const loginSchema = yup.object().shape({
  mobile_no: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only numbers")
    .min(7, "Invalid phone number"),
  password: yup.string().required("Password  is required"),
});

export const phoneSchema = yup.object().shape({
  mobile_no: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only numbers")
    .min(7, "Invalid phone number"),
});

export const pwdSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password  is required")
    .min(8, "Password must be at least 8 characters long"),
});

//holiday validations
export const holidaySchema = yup.object().shape({
  name: yup.string().required("Name field is empty"),
  date: yup.string().required("Date field is empty"),
});

//Manage admin validations
export const adminDetailsSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  mobile_no: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]+$/, "Mobile number must contain only numbers")
    .min(8, "Invalid phone number"),
  email: yup
    .string()
    .required("Email  is required")
    .email("Invalid email address"),
  password: yup
    .string()
    .required("Password  is required")
    .min(8, "Password must be at least 8 characters long"),
});

//Manage events validations
export const eventSchema = yup.object().shape({
  event_name: yup.string().required("Event name is required"),
  event_info: yup.string().required("Event info is required"),
  venue: yup.string().required("Event venue is required"),
  payment: yup.string().required("Payment can't be null"),
  capacity: yup.string().required("Capacity can't be null"),
  selectedDateStr: yup.string().required("Event date is required"),
  hour1: yup.string().required("Event time is required"),
  min1: yup.string().required("Event time is required"),
});

//Manage product validations
