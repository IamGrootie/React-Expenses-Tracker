import { Link} from 'react-router-dom';
import Logo from '../../images/Logo.svg'
import google from '../../images/Google.svg'
import vector from '../../images/Vector.svg'
import Main from '../../images/Intro_img.svg'
import './style.css'

export default function Signin() {
  return (
    <div className='intro-container'>
        <div>
            <img src={Logo} className='logo'/>
            <h1>Welcome back</h1>
            <p>Welcome back! Please enter your details</p>
            <form>
                <label className='email-label'>Email</label>
                <input 
                    className='email-input' 
                    type="email" 
                    name="email" 
                    // onChange={handleChange} 
                    placeholder='Enter your email address'
                />
                <label className='password-label'>Password</label>
                <input 
                    className='password-input' 
                    type="password" 
                    name="password" 
                    // onChange={handleChange}
                    placeholder='·······'/>
                <section>
                    <input className='remember' type='checkbox'/>
                    <label className='remember'>Remember for 30 Days</label>
                    <Link to="/forgot-password">Forgot password</Link>
                </section>
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
