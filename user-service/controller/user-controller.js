import { auth, db } from "../config/firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";
import { ref, set } from "firebase/database";
import admin from "../config/firebase-service.js";
import axios from "axios";

export const createUserAccount = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCred) => {
		set(ref(db, "users/" + userCred.user.uid), {
			name: name,
			email: email
		});
        return res.status(201).json({
          message: "user created!",
          accessToken: userCred.user.stsTokenManager.accessToken,
        });
      }
    );
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { uid } = req.body;
    await admin
      .auth()
      .getUser(uid)
      .then((resp) => {
        return res.status(200).json(resp);
      });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { uid } = req.body;
    await admin
      .auth()
      .deleteUser(uid)
      .then(() => {
		set(ref(db, "users/" + uid), null);
        return res.status(200).json({
          message: "user deleted!",
        });
      });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    await signInWithEmailAndPassword(auth, email, password).then((userCred) => {
      return res.status(200).json({
        user: userCred.user,
        accessToken: userCred.user.stsTokenManager.accessToken,
        refreshToken: userCred.user.stsTokenManager.refreshToken,
        message: "user logged in!",
      });
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    await signOut(auth).then(() => {
      return res.status(200).json({
        message: "user logged out!",
      });
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await sendPasswordResetEmail(auth, email).then(() => {
      return res.status(200).json({
        message: "email sent!",
      });
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const endpoint =
      "https://securetoken.googleapis.com/v1/token?key=AIzaSyDeJkEKRIYJg1p2iP9-ybSlPl8Ye-7ZqjU";
    const payload = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };
    await axios.post(endpoint, payload).then((resp) => {
      return res.status(200).json({
        user_id: resp.data.user_id,
        idToken: resp.data.id_token,
        refreshToken: resp.data.refresh_token,
      });
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const revokeRefreshToken = async (req, res) => {
  try {
    const { uid } = req.body;
    await admin
      .auth()
      .revokeRefreshTokens(uid)
      .then(() => {
        return res.status(200).json({
          message: "refresh token revoked",
        });
      });
  } catch (error) {
    return res.status(400).json({
      mesasge: error.message,
    });
  }
};

export const sendEmailVerification = async (req, res) => {
  try {
    const { idToken } = req.body;
    const endpoint =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDeJkEKRIYJg1p2iP9-ybSlPl8Ye-7ZqjU";
    const payload = {
      requestType: "VERIFY_EMAIL",
      idToken: idToken,
    };
    await axios.post(endpoint, payload).then((resp) => {
      return res.status(200).json({
        email: resp.data.email,
      });
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
