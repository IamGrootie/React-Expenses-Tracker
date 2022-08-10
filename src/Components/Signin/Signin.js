import React from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {signInWithEmailAndPassword, setPersistence, browserSessionPersistence, onAuthStateChanged} from 'firebase/auth';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase-config";
import {useAuth} from "../../Contexts/RequireAuth.js";
import Logo from '../../images/Logo.svg'
import google from '../../images/Google.svg'
import vector from '../../images/Vector.svg'
import Main from '../../images/Intro_img.svg'
import './signin.css'

export default function Signin() {
    const [user, setUser] = React.useState({});
    const navigate = useNavigate();

    const [userLogin, setUserLogin] = React.useState({
        email: '',
        password: ''
    });

    React.useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
                console.log(userLogin.email,userLogin.password) //Attention change this
                
        signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
          .then((cred)=>{console.log("user logined:"+cred.user)
          sessionStorage.setItem("Auth Token", auth.currentUser.accessToken);
          sessionStorage.setItem("uid", auth.currentUser.uid);
          sessionStorage.setItem("email", auth.currentUser.email);
          navigate("/")} )
          .catch((err) => { console.log(err) })
    }

    function handleChange(e) {
        console.log("change")
        const { type, value } = e.target;
        setUserLogin((prev) => ({ ...prev, [type]: value }))
      }


    function handlePersistance(e){
        setPersistence(auth, browserSessionPersistence)
        .then((email, password) => {
            return signInWithEmailAndPassword(auth, email, password);
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    function handleGoogle(e){
        e.preventDefault();
                console.log(userLogin.email,userLogin.password)
        signInWithPopup(auth, provider)
        .then((cred)=>{
            console.log(cred);
            sessionStorage.setItem("Auth Token", auth.currentUser.accessToken);
            sessionStorage.setItem("uid", auth.currentUser.uid);
            sessionStorage.setItem("email", auth.currentUser.email);
            navigate("/")
        })
        .catch((err) => { console.log(err) })
    }

    const {forgotPassword} = useAuth();

    const forgotPasswordHandler = () => {
        console.log(userLogin.email)
        const email = userLogin.email;
        if (email)
          forgotPassword(email).then(() => {
            userLogin.email = "";
          });
      };

  return (
    <div className='intro-container'>
        <div className='form-container'>
            <img src={Logo} className='logo' alt=''/>
            <h1 className='title-sign'>Welcome back</h1>
            <p className='details'>Welcome back! Please enter your details</p>
            <form className='form-signup'>
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
                    placeholder='·······'/>
                <section className='options-section'>
                    <div>
                        <input className='remember-input' type='checkbox' onChange={handlePersistance} />
                        <label className='remember-label'>Remember for 30 Days</label>
                    </div>
                    <p onClick={forgotPasswordHandler}>Forgot password</p>
                </section>
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
                <p className='question'>Don't have an account? <Link to="/signup">Sign up for free</Link></p>
                <img src={vector} className='vector' alt=''/>
            </form>
        </div>
        <img src={Main} alt=''/>
    </div>
  )
}
