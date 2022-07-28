import React from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase-config";
import Logo from '../../images/Logo.svg'
import google from '../../images/Google.svg'
import vector from '../../images/Vector.svg'
import Main from '../../images/Intro_img.svg'
import './signup.css'

export default function Signup() {
    const navigate = useNavigate();

    const [userSign, setUserSign] = React.useState({
        email: '',
        password: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
                console.log(userSign.email,userSign.password)
          createUserWithEmailAndPassword(auth, userSign.email, userSign.password)
          .then((cred)=>{console.log("user created:"+cred.user)
          navigate("/")} )
          .catch((err) => { console.log(err) })
    }

    function handleChange(e) {
        console.log('change')
        const { type, value } = e.target;
        setUserSign((prev) => ({ ...prev, [type]: value }))
    }

    function handleGoogle(e){
        e.preventDefault();
                console.log(userSign.email,userSign.password)
        signInWithPopup(auth, provider)
        .then((cred)=>{
            console.log(cred);
        })
        .catch((err) => { console.log(err) })
    }

  return (
    <div className='intro-container'>
        <div className='form-container'>
            <img src={Logo} className='logo' alt=''/>
            <h1 className='title-sign'>Create a new account</h1>
            <p className='details'>Welcome back! Please enter your details</p>
            <form className='form-signup'>
                <label className='name-label'>Full Name</label>
                <input 
                    className='details-input' 
                    type="text" 
                    name="text" 
                    onChange={handleChange} 
                    placeholder='Enter your full name'
                />
                <label className='email-label'>Email</label>
                <input 
                    className='details-input' 
                    type="email" 
                    name="email" 
                    onChange={handleChange} 
                    placeholder='Enter your email address'
                />
                <label className='password-label'>Password</label>
                <input 
                    className='details-input' 
                    type="password" 
                    name="password" 
                    onChange={handleChange}
                    placeholder='·······'
                />
                <button 
                    onClick={handleSubmit}
                    className='sign-btn'>
                        Sign in
                </button>
                <button 
                    onClick={handleGoogle}
                    className='google-btn'>
                    <img src={google} alt=''/>
                    Sign in with google
                </button>
                <p className='question'>Already have an account? <Link to="/signin">Sign in</Link></p>
                <img className='vector' src={vector} alt=''/>
            </form>
        </div>
        <img src={Main} alt=''/>
    </div>
  )
}
