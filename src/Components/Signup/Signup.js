import {Link} from 'react-router-dom';
import Logo from '../../images/Logo.svg'
import google from '../../images/Google.svg'
import vector from '../../images/Vector.svg'
import Main from '../../images/Intro_img.svg'
import './style.css'

export default function Signup() {
  return (
    <div className='intro-container'>
        <div className='form-container'>
            <img src={Logo} className='logo'/>
            <h1>Create a new account</h1>
            <p className='details'>Welcome back! Please enter your details</p>
            <form>
                <label className='name-label'>Full Name</label>
                <input 
                    className='details-input' 
                    type="text" 
                    name="text" 
                    // onChange={handleChange} 
                    placeholder='Enter your full name'
                />
                <label className='email-label'>Email</label>
                <input 
                    className='details-input' 
                    type="email" 
                    name="email" 
                    // onChange={handleChange} 
                    placeholder='Enter your email address'
                />
                <label className='password-label'>Password</label>
                <input 
                    className='details-input' 
                    type="password" 
                    name="password" 
                    // onChange={handleChange}
                    placeholder='·······'
                />
                <button className='sign-btn'>Sign in</button>
                <button className='google-btn'>
                    <img src={google}/>
                    Sign in with google
                </button>
                <p className='question'>Don't have an account? <Link to="/signup">Sign up for free</Link></p>
                <img src={vector}/>
            </form>
        </div>
        <img src={Main}/>
    </div>
  )
}
