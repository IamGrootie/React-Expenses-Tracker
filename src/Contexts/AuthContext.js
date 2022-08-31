import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	GoogleAuthProvider,
	signInWithPopup,
	updateEmail,
	updatePassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import { getDoc, doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [userDetails, setUserDetails] = useState({});
	const [loading, setLoading] = useState(true);
	const provider = new GoogleAuthProvider();

	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	async function signInGoogle(setLoading, navigate, setErrors) {
		try {
			const { user } = await signInWithPopup(auth, provider);
			setLoading(true);
			const docRef = await getDoc(doc(db, "users", user.uid));
			if (!docRef.exists()) {
				createUserDetails(user.uid, user.displayName, user.email);
			}
			navigate("/", { replace: true });
		} catch {
			setErrors({ email: "Failed to create an account" });
		}
		setLoading(false);
	}
	function logout() {
		return signOut(auth);
	}
	function setDisplayName(user, name) {
		return updateProfile(user, {
			displayName: name,
		});
	}
	function updateUsersEmail(email) {
		return updateEmail(currentUser, email);
	}
	function updateUsersPassword(password) {
		return updatePassword(currentUser, password);
	}
	function updateUser(update) {
		return updateDoc(doc(db, "users", currentUser.uid), update);
	}
	function createUserDetails(uid, name, email) {
		return setDoc(doc(db, "users", uid), {
			displayName: name,
			email: email,
			firstName: "",
			lastName: "",
			dateOfBirth: "",
			mobileNumber: "",
		});
	}

	//   const forgotPassword = email => {
	//     return sendPasswordResetEmail(auth, email);
	//   };

	useEffect(() => {
		setLoading(true);
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	useEffect(() => {
		if (currentUser) {
			const docRef = doc(db, "users", currentUser.uid);
			onSnapshot(docRef, async (doc) => {
				const info = doc.data();
				setUserDetails(info);
			});
		}
	}, [currentUser]);

	const value = {
		currentUser,
		userDetails,
		signup,
		login,
		signInGoogle,
		logout,
		updateUsersEmail,
		updateUsersPassword,
		setDisplayName,
		createUserDetails,
		updateUser,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
