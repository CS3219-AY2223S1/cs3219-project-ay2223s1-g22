import axios from "axios";
import { auth } from "../config/firebase-service.js"
import { URL_FIREBASE_SVC } from "../config/configs.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export const createUserAccount = async (email, password) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password).then((userCred) => {
			console.log("user created!");
		});
	} catch (error) {
		console.log(error.message);
	}
}

export const loginUser = async (email, password) => {
	await signInWithEmailAndPassword(auth, email, password).then((userCred) => {
		console.log("user logged in!");
	});
}

export const fetchToken = async (token) => {
	await axios.get(URL_FIREBASE_SVC + "/user", {
		headers: {
			Authorization: "Bearer " + token
		}
	}).then((res) => {
		console.log(res.data)
	});
}