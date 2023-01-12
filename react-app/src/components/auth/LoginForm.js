import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './Auth.css'
import logo from '../logo-png.png'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    console.log(errors)
    setErrors([])
    let validate = []
    if (email === '') {
      validate.push('Email is required')
    }

    if (password === '') {
      validate.push('Password is required')
      
    }else if (password.length < 6){
      validate.push('Password must be at least 6 characters')
    }
    setErrors(validate)
    if (validate.length > 0) return
    let validateEmail
    if (email) {

      validateEmail = email.split('@')[1].includes('.')
    }

    
    if (!validateEmail){
      validate.push( 'Email must have a valid \' . \' such as ".com or .io"')
      
    }

    setErrors(validate)
    if (validate.length > 0) return

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  

  const demo1Login = async(e) => {
    e.preventDefault()
    const data = await dispatch(login('demo@aa.io', 'password'));
    console.log(data)
    if (data) {
      setErrors(data);
    }
  }


  const demo2Login = async(e) => {
    e.preventDefault()
    const data = await dispatch(login('test@aa.io', 'password'));
    if (data) {
      setErrors(data);
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }
  console.log(errors)
  return (
    <>
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
      <h3>Sign in to Spend-mo</h3>
      <form onSubmit={onLogin} className="login-form">
        <ul className='errors-container' style={{marginLeft:'28px'}}>
          {errors.map((error, ind) => {
            console.log(error)
            return <li className='error-li' key={ind}>{error}</li>
            
          })}
        </ul>
        <div className='input-section'>
          <label htmlFor='email'>Email</label>
          <br/>
          <input
            name='email'
            type='email'
            placeholder='Email'
            
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className='input-section'>
          <label htmlFor='password'>Password</label>
          <br/>
          <input
            name='password'
            type='password'
            placeholder='Password'
            
            value={password}
            onChange={updatePassword}
          />
          </div>
          <div className='login-page-buttons-container'>
          <button onClick={demo1Login} className='sign-in-button' type='submit'>Sign In Demo</button>
          <button onClick={demo2Login} className='sign-in-button' type='submit'>Sign In Demo2</button>
          <button className='sign-in-button' type='submit'>Sign In</button>
          </div>
      </form>
      <div className='login-footer'>
            <NavLink to={'/sign-up'}>
            Sign Up
            </NavLink>
      </div>
    </div>
    </>
  );
};

export default LoginForm;
