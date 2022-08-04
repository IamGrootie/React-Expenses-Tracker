import React from 'react'
import { useAuth } from '../../Contexts/auth';
import Pen from '../../images/Edit_icon.svg'
import Mail from '../../images/Email_icon.svg'
import Lock from '../../images/Lock_icon.svg'
import Eye from '../../images/Eye_icon.svg'
import './settings.css'

export default function Settings() {

  const {
    currentUser,
    updateUser,
    updateEmail,
    UpdatePassword,
    updatePhoneNumber
  } = useAuth();

  // const firstName = currentUser.displayName.split(' ')[0];
  // const lastName = currentUser.displayName.split(' ')[1];

  const [userData, setUserData] = React.useState({
    name: currentUser.displayName,
    email: currentUser.email || '',
    phoneNumber: currentUser.phoneNumber || '',
    password: '',
    passwordConfirmation: ''
  });

  console.log(currentUser)

  const [error, setError] = React.useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
  });

  const [edit, setEdit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(e.target)
    setUserData(prev => {
      return {
        ...prev,
        [name]: value,
      }
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, phone, password, passwordConfirmation} = userData;
    
    let information = [];

    console.log(userData);

    if (name !== currentUser.displayName && name !== '') {
      information.push( updateUser(currentUser, { displayName: name }) );
    }

    if (email!== currentUser.email && email!== '') {
      information.push( updateEmail(currentUser, { email: email }) );
    }

    if (password!== currentUser.password && password!== '') {
      information.push( UpdatePassword(currentUser, { password: password }) );
    }

    if (passwordConfirmation !== password) {
      setError((prev) => {
        return {
          ...prev,
          password: 'Passwords are different'
        }
      })
      return;
    }

    try {
      setLoading(true);
      setEdit(true)
      await Promise.all(information);
    }
    catch(error){
      setEdit(false);
      console.log(error);
      if(error.message === 'auth/weak-password' ) {
        setError((prev) => {
          return {
            ...prev,
            password: 'Password is too weak'
          }
        })
      }
    }
    setLoading(false);
  }



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
          <button className='edit-btn' onClick={() => setEdit(true)}> 
            <img src={Pen} className='pen-icon' alt=''/>
            Edit
          </button>
        </section>

        
        <form className='form-info'>
          <section className='form-wrap'>
            <div className='form-column'>
              <label className='label label-fname'>First Name</label>
              <input 
                disabled={!edit}
                className='input input-fname' 
                type="text" 
                name="firstname" 
                onChange={handleChange} 
                value={userData.name}
                placeholder='First Name'
              />
            </div>

            <div className='form-column'>
            <label className='label label-lname'>Last Name</label>
            <input
              disabled={!edit}
              className='input input-lname' 
              type="text"
              name="lastName" 
              onChange={handleChange}
              value={userData.name}
              placeholder='Last Name'
            />
            </div>

            <div className='form-column'>
            <label className='label label-date'>Date of birth</label>
            <input
              disabled={!edit}
              className='input input-date'
              type="date"
              name="dob"
              onChange={handleChange}
              placeholder='Date of birth'
            />
            </div>

            <div className='form-column'>
            <label className='label label-phone'>Mobile Number</label>
            <input
              disabled={!edit} 
              className='input input-phone'
              type="number"
              name="phone"
              onChange={handleChange}
              value={userData.phoneNumber}
              placeholder='Mobile Number'
            />
            </div>
          </section>

          <label className='label-email'>Email</label>
          <div className='mail-container'>
            <img src={Mail} className='mail-icon' alt=''/>
            <input
              disabled={!edit}
              className='input-mail'
              type="email"
              name="email"
              onChange={handleChange}
              value={userData.email} 
              placeholder={userData.email}
            />
          </div>

          <section className='form-wrap'>
            <div className='form-column'>
              <label className='label-pass'>New Password</label>
              <div className='pass-container'>
                <img src={Lock} className='lock-icon' alt=''/>
                <input 
                  disabled={!edit}
                  className='pass-input' 
                  type="password" 
                  name="password" 
                  onChange={handleChange}
                  placeholder='·······'
                  value={userData.password}
                />
                <img src={Eye} className='eye-icon' alt=''/>
              </div>
            </div>

            <div className='form-column'>
              <label className='label-pass'>Confirm Password</label>
              <div className='pass-container'>
                <img src={Lock} className='lock-icon' alt=''/>
                <input 
                  disabled={!edit}
                  className='pass-input' 
                  type="password" 
                  name="password" 
                  onChange={handleChange}
                  placeholder='·······'
                  value={userData.passwordConfirmation}
                />
                <img src={Eye} className='eye-icon' alt=''/>
              </div>
              <p>{error.password}</p>
            </div>
          </section>

          <button 
            disabled={edit}
            onClick={handleSubmit}
            className='update-btn'>Update</button>
        </form>
      </div>
    </div>
  )
}
