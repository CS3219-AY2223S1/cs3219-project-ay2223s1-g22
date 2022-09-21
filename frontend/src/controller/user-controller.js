import axios from "axios";
import { USER_SERVICE_URL } from "../config/configs.js";

export const sendEmailVerification = async (idToken) => {
	try {
		return await axios.post(USER_SERVICE_URL + "/sendEmailVerification", { idToken })
	} catch (error) {
		console.log(error.response.message);
	}
}

export const getUser = async (uid) => {
	try {
		return await axios.post(USER_SERVICE_URL + "/getuser", { uid })
	} catch (error) {
		console.log(error.message);
	}
}

export const deleteUserAccount = async (uid) => {
	try {
		return await axios.post(USER_SERVICE_URL + "/deleteuser", { uid });
	} catch (error) {
		console.log(error.response.data.message);
	}
};

export const createUserAccount = async (email, password) => {
	try {
		const payload = {
			email: email,
			password: password
		};
		return await axios.post(USER_SERVICE_URL + "/signup", payload);
	} catch (error) {
		console.log(error.response.message);
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
