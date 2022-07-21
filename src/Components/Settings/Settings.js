import React from 'react'
import Pen from '../../images/Edit_icon.svg'
import Mail from '../../images/Email_icon.svg'
import Lock from '../../images/Lock_icon.svg'
import Eye from '../../images/Eye_icon.svg'
import './settings.css'

export default function Settings() {
  return (
    <div className='settings-container'>

      <nav className='navbar-container'>
        <h1 className='title'>Settings</h1>
        <button className='profile-btn'>
           {/* // <img src=PROFILE PIC/>  */}
          <h3>NAME OF PROFILE-CHANGE</h3>
        </button>
      </nav>


      <div className='main-container'>
        <h2 className='subtitle-acc'>Account Information</h2>
        <p className='subtitle-details'>Update your account information</p>

        <section className='personal-info'>
          <h2 className='subtitle-pers'>Personal Information</h2>
          <button className='edit-btn'> 
            <img src={Pen} className='pen-icon' alt=''/>
            Edit
          </button>
        </section>

        
        <form className='form-info'>
          <section className='form-wrap'>
            <div className='form-column'>
              <label className='label label-fname'>First Name</label>
              <input 
                className='input input-fname' 
                type="text" 
                name="firstname" 
                // onChange={handleChange} 
                placeholder='props.firstName' //FIX
              />
            </div>

            <div className='form-column'>
            <label className='label label-lname'>Last Name</label>
            <input
              className='input input-lname' 
              type="text"
              name="lastName" 
              // onChange={handleChange}
              placeholder='props.lastName' //FIX
            />
            </div>

            <div className='form-column'>
            <label className='label label-date'>Date of birth</label>
            <input
              className='input input-date'
              type="date"
              name="dob"
              // onChange={handleChange}
              placeholder='props.dob' //FIX
            />
            </div>

            <div className='form-column'>
            <label className='label label-phone'>Mobile Number</label>
            <input
              className='input input-phone'
              type="number"
              name="phone"
              // onChange={handleChange}
              placeholder='props.phone' //FIX
            />
            </div>
          </section>

          <label className='label-email'>Email</label>
          <div className='mail-container'>
            <img src={Mail} className='mail-icon' alt=''/>
            <input
              className='input-mail'
              type="email"
              name="email"
              // onChange={handleChange}
              placeholder='props.dob' //FIX
            />
          </div>

          <section className='form-wrap'>
            <div className='form-column'>
              <label className='label-pass'>New Password</label>
              <div className='pass-container'>
                <img src={Lock} className='lock-icon' alt=''/>
                <input 
                        className='pass-input' 
                        type="password" 
                        name="password" 
                        // onChange={handleChange}
                        placeholder='·······'
                />
                <img src={Eye} className='eye-icon' alt=''/>
              </div>
            </div>

            <div className='form-column'>
              <label className='label-pass'>Confirm Password</label>
              <div className='pass-container'>
                <img src={Lock} className='lock-icon' alt=''/>
                <input 
                        className='pass-input' 
                        type="password" 
                        name="password" 
                        // onChange={handleChange}
                        placeholder='·······'
                />
                <img src={Eye} className='eye-icon' alt=''/>
              </div>
            </div>
          </section>

          <button className='update-btn'>Update</button>
        </form>
      </div>
    </div>
  )
}
