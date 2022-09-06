import axios from "axios";
import { USER_SERVICE_URL } from "../config/configs.js";

export const authenticateToken = async (token) => {
  try {
    await axios
      .get(USER_SERVICE_URL + "/authenticate", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("from fetchToken: token authenticated!");
        return true;
      });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const deleteUserAccount = async (user) => {
  try {
    return await axios.post(USER_SERVICE_URL + "/deleteuser", { user });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const createUserAccount = async (email, password) => {
  try {
    return await axios.post(USER_SERVICE_URL + "/signup", { email, password });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const loginUser = async (email, password) => {
  try {
    return await axios.post(USER_SERVICE_URL + "/login", { email, password });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(USER_SERVICE_URL + "/logout").then((res) => {
      console.log(res.data.message);
      return true;
    });
  } catch (error) {
    console.log(error.response.data.message);
    return false;
  }
};

export const resetPassword = async (email) => {
  try {
    await axios
      .post(USER_SERVICE_URL + "/resetpassword", { email })
      .then((res) => {
        console.log(res.data.message);
      });
  } catch (error) {
    console.log(error.response.data.message);
  }
};
