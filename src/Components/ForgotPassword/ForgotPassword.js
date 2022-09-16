import React, { useRef, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext.js";
import { Link } from "react-router-dom";
import Logo from "../../images/Logo.svg";
import Main from "../../images/Intro_img.svg";
import vector from "../../images/Vector.svg";
import "../../Components/Signin/signin.css"

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setErrorMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setErrorMessage("Failed to reset password");
    }

    setLoading(false);
  }

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    console.log("change");
    const { type, value } = e.target;
    setUserLogin(prev => ({ ...prev, [type]: value }));
  }

  const { forgotPassword } = useAuth();

  const forgotPasswordHandler = () => {
    console.log(userLogin.email);
    const email = userLogin.email;
    if (email)
      forgotPassword(email).then(() => {
        userLogin.email = "";
      });
  };

  return (
    <div className="intro-container">
      <div className="form-half">
        <div className="form-container">
          <img src={Logo} className="su-logo" alt="" />
          <h1 className="title-sign">Password Reset</h1>
          <p className="details">Please enter your details.</p>

          <form onSubmit={handleSubmit} className="form-signup">
            <div className="label-container">
              <label className="email-label">Email</label>
              {errorMessage && (
                <label className="errorMessage">{errorMessage}</label>
              )}
              {message && (
                <label className="errorMessage" style={{ color: "green" }}>
                  {message}
                </label>
              )}
            </div>
            <input
              className="details-input"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email address"
            />
            <button
              disabled={loading}
              type="submit"
              onClick={forgotPasswordHandler}
              className="sign-btn"
            >
              Reset Password
            </button>
            <p className="question">
              Want to return? <Link to="/signin">Sign in</Link>
            </p>
            <img src={vector} className="fp-vector" alt="" />
          </form>

          {errorMessage && <alert variant="danger">{errorMessage}</alert>}
          {message && <alert variant="success">{message}</alert>}
        </div>
      </div>
      <div className="image-half">
        <img src={Main} alt="" className="landing-image" />
      </div>
    </div>
  );
}
