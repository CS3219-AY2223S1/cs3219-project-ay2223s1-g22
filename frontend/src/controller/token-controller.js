import axios from "axios";
import { USER_SERVICE_URL } from "../config/configs.js";

export const isUserLoggedIn = async (idToken) => {
	if (idToken === "") {
		// user is not logged in
		return false;
	}
	
	return authenticateToken(idToken);
}

export const authenticateToken = async (token) => {
	try {
		await axios.get(USER_SERVICE_URL + "/authenticate", {
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
		return await axios.post(USER_SERVICE_URL + "/refreshAccessToken", { refreshToken })
	} catch (error) {
		console.log(error.response.message);
	}
}

export const revokeRefreshToken = async (uid) => {
	try {
		return await axios.post(USER_SERVICE_URL + "/revokeRefreshToken", { uid })
	} catch (error) {
		console.log(error.response.message);
	}
}