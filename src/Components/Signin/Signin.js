import {Link} from 'react-router-dom';
import Logo from '../../images/Logo.svg'
import google from '../../images/Google.svg'
import vector from '../../images/Vector.svg'
import Main from '../../images/Intro_img.svg'
import './style.css'

export default function Signin() {
  return (
    <div className='intro-container'>
        <div className='form-container'>
            <img src={Logo} className='logo'/>
            <h1>Welcome back</h1>
            <p className='details'>Welcome back! Please enter your details</p>
            <form>
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
                    placeholder='·······'/>
                <section className='options-section'>
                    <div>
                        <input className='remember-input' type='checkbox'/>
                        <label className='remember-label'>Remember for 30 Days</label>
                    </div>
                    <Link to="/forgot-password">Forgot password</Link>
                </section>
                <button className='sign-btn'>Sign in</button>
                <button className='google-btn'>
                    <img src={google}/>
                    Sign in with google
                </button>
                <p className='question'>Don't have an account? <Link to="/signup">Sign up for free</Link></p>
                <img src={vector} className='vector'/>
            </form>
        </div>
        <img src={Main}/>
    </div>
  )
}
