import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useAuth } from "../../Contexts/RequireAuth.js";
import Logo from "../../images/Logo.svg";
import google from "../../images/Google.svg";
import vector from "../../images/Vector.svg";
import Main from "../../images/Intro_img.svg";
import "./signup.css";

export default function Signup() {
  const { signup, setDisplayName, signInGoogle, createUserDetails } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  //Create a user, set a display name, create user details
  const handleSubmit = async e => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true);
        const { user } = await signup(data.email, data.password);
        await setDisplayName(user, data.name);
        await createUserDetails(user.uid, data.name, data.email);
        navigate("/", { replace: true });
      } catch (err) {
        setErrors({ name: "Failed to create an account" });
      }
    }
    setLoading(false);
  };

  //Check for errors and set Errors
  useEffect(() => {
    setErrors({});
    if (data.password.length < 6 && data.password !== "") {
      setErrors(prev => ({
        ...prev,
        password: "Password is too short",
      }));
    }
    if (!/.+@.+\..+/.test(data.email) && data.email !== "") {
      setErrors(prev => ({
        ...prev,
        email: "Email is incorrect",
      }));
    }
    if (!/^[a-zA-Z\s]+$/g.test(data.name) && data.name !== "") {
      setErrors(prev => ({
        ...prev,
        name: "Name can contain only letters",
      }));
    }
  }, [data]);

  // function handleGoogle(e){
  //     e.preventDefault();
  //             console.log(userSign.email,userSign.password)
  //     signInWithPopup(auth, provider)
  //     .then((cred)=>{
  //         console.log(cred);
  //     })
  //     .catch((err) => { console.log(err) })
  // }

  return (
    <div className="intro-container">
      <div className="form-container">
        <img src={Logo} className="logo" alt="" />
        <h1 className="title-sign">Create a new account</h1>
        <p className="details">Welcome back! Please enter your details</p>
        <form className="form-signup" onSubmit={handleSubmit}>
          <label className="name-label">Full Name</label>
          <input
            className="details-input"
            type="text"
            name="name"
            onChange={handleChange}
            value={data.name}
            placeholder="Enter your full name"
          />
          <label className="email-label">Email</label>
          <input
            className="details-input"
            type="email"
            name="email"
            onChange={handleChange}
            value={data.email}
            placeholder="Enter your email address"
          />
          <label className="password-label">Password</label>
          <input
            className="details-input"
            type="password"
            name="password"
            onChange={handleChange}
            value={data.password}
            placeholder="·······"
          />
          <button onClick={handleSubmit} className="sign-btn">
            Sign up
          </button>
          <button className="google-btn">
            <img src={google} alt="" />
            Sign up with google
          </button>
          <p className="question">
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
          <img className="vector" src={vector} alt="" />
        </form>
      </div>
      <img src={Main} alt="" />
    </div>
  );
}
