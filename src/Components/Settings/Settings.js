import React from 'react'
import { useAuth } from '../../Contexts/auth';
import Pen from '../../images/Edit_icon.svg'
import Mail from '../../images/Email_icon.svg'
import Lock from '../../images/Lock_icon.svg'
import Eye from '../../images/Eye_icon.svg'
import './settings.css'
import { updateProfile, updateEmail,
         updatePassword, EmailAuthProvider , 
         reauthenticateWithCredential} from 'firebase/auth';

export default function Settings() {

  const {
    currentUser,
  } = useAuth();

  const [userData, setUserData] = React.useState({
    name: currentUser.displayName,
    email: currentUser.email || '',
    phoneNumber: currentUser.phoneNumber || '',
    photo: currentUser.photoUrl || '',
    password: '',
    passwordConfirmation: '',

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

  const [firstName, setFirstName] = React.useState(
    userData.name.substring(0, userData.name.indexOf(' ')));
  
  const [lastName, setLastName] = React.useState(
    userData.name.substring(userData.name.indexOf(' ') + 1));

  const [userBirth, setUserBirth] = React.useState();

  const [userEmail, setUserEmail] = React.useState(userData.email);
  const [userPhone, setUserPhone] = React.useState(currentUser.phoneNumber);
  const [userPassword, setUserPassword] = React.useState();

  const [passwordShown, setPasswordShown] = React.useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const {passwordConfirmation} = userData;

    const credentials = EmailAuthProvider.credential(
      userEmail,
      passwordConfirmation,
      currentUser.providerData.tenantId
    )

    if (currentUser.email !== userEmail ) {
      
      console.log(credentials);

      reauthenticateWithCredential(currentUser, credentials).then(()=> {
        updateEmail(currentUser, { userEmail })
          .then(()=> {
            alert('Email updated successfully')
            })
          .catch((error)=> {
            alert(error)
            });
      })
    }

    if (currentUser.displayName !== `${firstName} ${lastName}`) {
      updateProfile(currentUser, {
        displayName: `${firstName} ${lastName}`,
      })
      .then(()=> { alert('Name updated successfully') })
      .catch((error)=> { console.log(error) });
    }

    if (userPassword){
      reauthenticateWithCredential(currentUser, credentials).then(()=> {
        updatePassword(currentUser, { userPassword })
        .then(()=> {
          alert('Password updated successfully')
          })
        .catch((error)=> { console.log(error) })
      })
    } 
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
                onChange={(event) => {setFirstName(event.target.value)}}
                placeholder={firstName}
              />
            </div>

            <div className='form-column'>
            <label className='label label-lname'>Last Name</label>
            <input
              disabled={!edit}
              className='input input-lname' 
              type="text"
              name="lastName" 
              onChange={(event) => {setLastName(event.target.value)}}
              placeholder={lastName}
            />
            </div>

            <div className='form-column'>
            <label className='label label-date'>Date of birth</label>
            <input
              disabled={!edit}
              className='input input-date'
              type="date"
              name="dob"
              onChange={(event) => {setUserBirth(event.target.value)}}
              placeholder={userBirth}
            />
            </div>

            <div className='form-column'>
            <label className='label label-phone'>Mobile Number</label>
            <input
              disabled={!edit} 
              className='input input-phone'
              name="phone"
              onChange={(event) => {setUserPhone(event.target.value)}}
              placeholder={userData.phoneNumber}
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
              onChange={(event) => {setUserEmail(event.target.value)}}
              placeholder={userEmail}
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
                  type={passwordShown ? "text" : "password"} 
                  name="password" 
                  onChange={(event) => {
                    event.preventDefault();
                    setUserPassword(event.target.value)}}
                  placeholder='·······'
                />
                <button onClick={() => setPasswordShown(true)}>
                  <img src={Eye} className='eye-icon' alt=''/>
                </button>
              </div>
            </div>

            <div className='form-column'>
              <label className='label-pass'>Confirm Password</label>
              <div className='pass-container'>
                <img src={Lock} className='lock-icon' alt=''/>
                <input 
                  disabled={!edit}
                  className='pass-input' 
                  type={passwordShown ? "text" : "password"}
                  name="password" 
                  onChange={(event) => {
                    event.preventDefault();
                    setUserPassword(event.target.value)}}
                  placeholder='·······'
                />
                <button onClick={() => setPasswordShown(true)}>
                  <img src={Eye} className='eye-icon' alt=''/>
                </button>
              </div>
              <p>{error.password}</p>
            </div>
          </section>

          <button 
            disabled={!edit}
            onClick={handleSubmit}
            className='update-btn'>Update</button>
        </form>
      </div>
    </div>
  )
}
