import axios from "axios";
import { API_GATEWAY_URL } from "../config/configs.js";

export const sendEmailVerification = async (accessToken) => {
  try {
    return await axios.post(API_GATEWAY_URL + "/sendEmailVerification", {
      accessToken,
    });
  } catch (error) {
    console.log(error.response.message);
  }
};

export const getUser = async (uid, accessToken) => {
  try {
    return await axios.post(
      API_GATEWAY_URL + "/getuser",
      { uid },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUserAccount = async (uid, accessToken) => {
  try {
    return await axios.post(
      API_GATEWAY_URL + "/deleteuser",
      { uid },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const createUserAccount = async (name, email, password) => {
  try {
    const payload = {
      name: name,
      email: email,
      password: password,
    };
    return await axios.post(API_GATEWAY_URL + "/signup", payload);
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const loginUser = async (email, password) => {
  try {
    return await axios.post(API_GATEWAY_URL + "/login", { email, password });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const logoutUser = async (uid, accessToken) => {
  let logoutSuccessful = false;

  try {
    await axios
      .post(
        API_GATEWAY_URL + "/logout",
        { uid },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        console.log(res.data.message);
        logoutSuccessful = true;
      });
  } catch (error) {
    console.log(error.response.data.message);
    logoutSuccessful = false;
  }

  return logoutSuccessful;
};

export const resetPassword = async (email) => {
  try {
    await axios
      .post(API_GATEWAY_URL + "/resetpassword", { email })
      .then((res) => {
        console.log(res.data.message);
      });
  } catch (error) {
    console.log(error.response.data.message);
  }
};
