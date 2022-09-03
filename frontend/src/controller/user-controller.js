import axios from "axios";
import { URL_FIREBASE_SVC } from "../config/configs.js";

export const authenticateToken = async (token) => {
	try {
		await axios.get(URL_FIREBASE_SVC + "/user", {
			headers: {
				Authorization: "Bearer " + token
			}
		}).then((res) => {
			console.log("from fetchToken: token authenticated!")
			return true;
		});
	} catch (error) {
		console.log(error);
	}
}

export const createUserAccount = async (email, password) => {
	try {
		await axios.post(URL_FIREBASE_SVC + "/signup", { email, password })
			.then((res) => {
				console.log(res.data.message);
				const token = res.data.token.accessToken;
				if (authenticateToken(token)) {
					return token;
				} else {
					return "";
				}
			})
	} catch (error) {
		console.log(error);
	}
}

export const loginUser = async (email, password) => {
	try {
		await axios.post(URL_FIREBASE_SVC + "/login", { email, password })
			.then((res) => {
				console.log(res.data.message);
				const token = res.data.token.accessToken;
				if (authenticateToken(token)) {
					return token;
				} else {
					return "";
				}
			})
	} catch (error) {
		console.log(error);
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
		console.log(error);
	}
}