import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import logo from '../logo-png.png'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    let validate = []
    setErrors([])
    
    if (firstName.length < 2 || firstName.length > 15){
      
      validate.push("First Name must be between 2 and 15 characters.")
      
    }

    if (lastName.length < 2 || lastName.length > 15){
      validate.push("Last Name must be between 2 and 15 characters.")
    }

    if (username.length > 20 || username.length < 3){
      validate.push('Username must be between 3 and 20 characters')
    }

    if (password.length < 6 || password.length > 20) {
      
      validate.push('Password must be between 6 and 20 characters')
    }

    if (repeatPassword === ''){
      validate.push('Must confirm a valid password')
    } else if (repeatPassword !== password){
      validate.push('Repeat password must match Password')
    }
    
    setErrors(validate)
    // console.log(errors)
    if (validate.length > 0 ) return 

    let validateEmail = email.split('@')[1].includes('.')

    if (!validateEmail) {
      validate.push('Email must have a valid \' . \' such as ".com or .io"')
    }

    
    if (password === repeatPassword) {
      const obj = {
        'first_name':firstName,
        'last_name':lastName,
        username,
        email,
        password
      }
      const data = await dispatch(signUp(obj));
      if (data) {
        setErrors(data)
      }
    }else {
      setErrors([...errors, 'Password and Repeat Password must match'])
    }
  };


  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/instructions' />;
  }

  return (
    <div className='form-container'>
      <div className='login-signup-container'>
        <nav className='login-signup-navbar'>
          <div className='login-signup-logo'>
            <NavLink className={'logo-link'} to={'/'}>
              <img style={{ height: '40px' }} src={logo} alt='logo' />
            </NavLink>
          </div>
          <ul className='login-signup-ul'>
            <li>
              <NavLink className={'login-signup-links'} to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className={'login-signup-links'} to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className='signup-form-container'>

        <h3>Sign Up Form</h3>
          <form className='signup-form' onSubmit={onSignUp}>
            <ul className='errors-container' style={{ marginLeft: '28px' }}>
              {errors.map((error, ind) => (
                <li className='error-li' key={ind}>{error}</li>
              ))}
            </ul>
            <div className='input-section'>
              <label>First Name</label>
              <input
                type='text'
                name='first_name'
                
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              ></input>
            </div>
            <div className='input-section'>
              <label>Last Name</label>
              <input
                type='text'
                name='lastName'
                
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              ></input>
            </div>
            
            <div className='input-section'>
              <label>User Name</label>
              <input
                type='text'
                name='username'
                
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div className='input-section'>
              <label>Email</label>
              <input
                type='email'
                name='email'
                required
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className='input-section'>
              <label>Password</label>
              <input
                type='password'
                name='password'
                
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className='input-section'>
              <label>Repeat Password</label>
              <input
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                
              ></input>
            </div>
            <button className='sign-up-button' type='submit'>Sign Up</button>
          </form>
      </div>
      <div className='login-footer'>
        <NavLink to={'/login'}>
          Sign In
        </NavLink>
      </div>
    </div>
  );
};

export default SignUpForm;
