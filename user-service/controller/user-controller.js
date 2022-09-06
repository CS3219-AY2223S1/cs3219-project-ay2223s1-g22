import { auth } from "../config/firebase-config.js"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import admin from "../config/firebase-service.js";

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
		return res.status(400).json({
			message: error.message
		})
	}
}

export const deleteUser = async (req, res) => {
	try {
		const { user } = req.body;
		await admin.auth().deleteUser(user.uid).then(() => {
			return res.status(200).json({
				message: "user deleted!"
			})
		})
	} catch (error) {
		return res.status(400).json({
			message: error.message
		})
	}
}

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		await signInWithEmailAndPassword(auth, email, password).then((userCred) => {
			return res.status(200).json({
				user: userCred.user,
				accessToken: userCred.user.stsTokenManager.accessToken,
				refreshToken: userCred.user.stsTokenManager.refreshToken,
				message: "user logged in!"
			})
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message
		})
	}
}

export const logoutUser = async (req, res) => {
	try {
		await signOut(auth).then(() => {
			return res.status(200).json({
				message: "user logged out!"
			})
		})
	} catch (error) {
		return res.status(400).json({
			message: error.message
		})
	}
}

export const resetPassword = async (req, res) => {
	try {
		const { email } = req.body;
		await sendPasswordResetEmail(auth, email).then(() => {
			return res.status(200).json({
				message: "email sent!"
			})
		})
	} catch (error) {
		return res.status(400).json({
			message: error.message
		})
	}
}
