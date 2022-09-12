import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { nanoid } from "nanoid";
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
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  listAll,
  list,
} from "firebase/storage";
import { auth, db } from "../firebase-config";
import {
  getDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { v4 } from "uuid";

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
      photoURL: "",
      email: email,
      firstName: name.substring(0, name.indexOf(" ")),
      lastName: name.substring(name.indexOf(" ") + 1),
      dateOfBirth: "",
      mobileNumber: "",
      currency: "£"
    });
  }

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  // check to change image name within storage location currently [objectobject].png
  const storage = getStorage();

  async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser + nanoid() + ".png");

    setLoading(true);

    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(currentUser, { photoURL });

    setLoading(false);

    // reloads wepbage with new photoURL being displayed
    window.location.reload();
  }

  // const [imageUpload, setImageUpload] = useState(null);
  // const [imageUrls, setImageUrls] = useState([]);

  // const imagesListRef = ref(db, "users", currentUser.uid);
  // const uploadFile = () => {
  //   if (imageUpload == null) return;
  //   const imageRef = ref(db, "users", currentUser.uid, `images/${imageUpload.name}`);
  //   uploadBytes(imageRef, imageUpload).then(snapshot => {
  //     getDownloadURL(snapshot.ref).then(url => {
  //       setImageUrls(prev => [...prev, url]);
  //     });
  //   });
  // };

  // useEffect(() => {
  //   listAll(imagesListRef).then(response => {
  //     response.items.forEach(item => {
  //       getDownloadURL(item).then(url => {
  //         setImageUrls(prev => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

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
    forgotPassword,
    upload,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
