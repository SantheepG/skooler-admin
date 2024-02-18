import axios from "axios";
import { base_URL2 } from "../App";
import { base_URL } from "../App";
export const schoolID = "SC-24";

export const FetchSchool = async () => {
  try {
    const response = await axios.get(
      `${base_URL2}/super/getschool/${schoolID}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const FetchStats = async () => {
  try {
    const response = await axios.get(`${base_URL}/school/fetch/stats`);
    return response;
  } catch (error) {
    return error;
  }
};
