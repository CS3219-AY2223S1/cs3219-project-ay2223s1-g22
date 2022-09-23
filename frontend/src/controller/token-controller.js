import axios from "axios";
import { API_GATEWAY_URL } from "../config/configs.js";

export const isUserLoggedIn = (data, storeUserData) => {
  if (data.idToken === "") {
    // user is not logged in
    return false;
  }

  if (authenticateToken(data.idToken)) {
    return true;
  } else {
    const promise = refreshAccessToken(data.refreshToken);
    promise.then((res) => {
      if (res) {
        console.log("expired!");
        console.log(res.data);
        storeUserData(res.data.idToken, res.data.refreshToken, data.user);
        return true;
      }
      return false;
    });
  }
};

export const authenticateToken = async (token) => {
  try {
    await axios
      .get(API_GATEWAY_URL + "/authenticate", {
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
    return false;
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    return await axios.post(API_GATEWAY_URL + "/refreshAccessToken", {
      refreshToken,
    });
  } catch (error) {
    console.log(error.response.message);
  }
};

export const revokeRefreshToken = async (uid) => {
  try {
    return await axios.post(API_GATEWAY_URL + "/revokeRefreshToken", { uid });
  } catch (error) {
    console.log(error.response.message);
  }
};
