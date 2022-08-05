import React, { createContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut, onAuthStateChanged,
	sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase-config';

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState({
		displayName: '',
        email: '',
        photoURL: '',
        phoneNumber: '',
	});

	const [loading, setLoading] = useState(true);

	const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

	const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

	const logout = () => {
		return signOut(auth);
	}

	const forgotPassword = (email) => {
		return sendPasswordResetEmail(auth, email);
	  };
    

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => [
			setCurrentUser(user)
		]);
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		loading,
		signup,
		login,
		logout,
		forgotPassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
}