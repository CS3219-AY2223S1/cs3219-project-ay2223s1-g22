import axios from "axios";
import { URL_FIREBASE_SVC } from "../config/configs.js";

const authenticateToken = async (token) => {
	await axios.get(URL_FIREBASE_SVC + "/user", {
		headers: {
			Authorization: "Bearer " + token
		}
	}).then((res) => {
		console.log("from fetchToken: token authenticated!")
		return true;
	});
}

export const createUserAccount = async (email, password) => {
	await axios.post(URL_FIREBASE_SVC + "/signup", { email, password })
		.then((res) => {
			console.log(res.data.message);
			const token = res.data.token.accessToken;
			if (authenticateToken(token)) {
				return token;
			}
		})
}

export const loginUser = async (email, password) => {
	await axios.post(URL_FIREBASE_SVC + "/login", { email, password })
		.then((res) => {
			console.log(res.data.message);
			return true;
		})
}

export const logoutUser = async () => {
	await axios.post(URL_FIREBASE_SVC + "/logout")
		.then((res) => {
			console.log(res.data.message);
			return true;
		})
}