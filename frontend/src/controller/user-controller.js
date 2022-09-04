import axios from "axios";
import { URL_FIREBASE_SVC } from "../config/configs.js";

export const authenticateToken = async (token) => {
	try {
		await axios.get(URL_FIREBASE_SVC + "/authenticate", {
			headers: {
				Authorization: "Bearer " + token
			}
		}).then((res) => {
			console.log("from fetchToken: token authenticated!")
			return true;
		});
	} catch (error) {
		console.log(error.response.data.message);
	}
}

export const deleteUserAccount = async (user) => {
	try {
		return await axios.post(URL_FIREBASE_SVC + "/deleteuser", { user })
	} catch (error) {
		console.log(error.response.data.message);
	}
}

export const createUserAccount = async (email, password) => {
	try {
		return await axios.post(URL_FIREBASE_SVC + "/signup", { email, password })
	} catch (error) {
		console.log(error.response.data.message);
	}
}

export const loginUser = async (email, password) => {
	try {
		return await axios.post(URL_FIREBASE_SVC + "/login", { email, password })
	} catch (error) {
		console.log(error.response.data.message);
	}
}

export const logoutUser = async () => {
	try {
		await axios.post(URL_FIREBASE_SVC + "/logout")
			.then((res) => {
				console.log(res.data.message);
				return true;
			})
	} catch (error) {
		console.log(error.response.data.message);
		return false;
	}
}

export const resetPassword = async (email) => {
	try {
		await axios.post(URL_FIREBASE_SVC + "/resetpassword", { email })
			.then((res) => {
				console.log(res.data.message)
			})
	} catch (error) {
		console.log(error.response.data.message);
	}
}