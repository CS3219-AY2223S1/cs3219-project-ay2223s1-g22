import { auth } from "../config/firebase-config.js"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

export const createUserAccount = async (req, res) => {
	try {
		const { email, password } = req.body;
		await createUserWithEmailAndPassword(auth, email, password).then((userCred) => {
			return res.status(201).json({
				user: userCred.user,
				token: userCred.user.stsTokenManager,
				message: "user created!"
			})
		});
	} catch (error) {
		console.log(error.message);
	}
}

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		await signInWithEmailAndPassword(auth, email, password).then((userCred) => {
			return res.status(200).json({
				user: userCred.user,
				token: userCred.user.stsTokenManager,
				message: "user logged in!"
			})
		});
	} catch (error) {
		console.log(error.message);
	}
}

export const logoutUser = async (req, res) => {
	try {
		await signOut(auth).then((userCred) => {
			return res.status(200).json({
				message: "user logged out!"
			})
		})
	} catch (error) {
		console.log(error.message);
	}
}
