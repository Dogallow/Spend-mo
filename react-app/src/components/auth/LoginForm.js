import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './Auth.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demo1Login = async(e) => {
    e.preventDefault()
    const data = await dispatch(login('demo@aa.io', 'password'));
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

  return (
    <div className='form-container'>
      <h3>Sign in to Spend-mo</h3>
      <form onSubmit={onLogin} className="login-form">
        <ul className='errors-container' style={{marginLeft:'28px'}}>
          {errors.map((error, ind) => (
            <li className='error-li'  key={ind}>{error}</li>
          ))}
        </ul>
        <div className='input-section'>
          <label htmlFor='email'>Email</label>
          <br/>
          <input
            name='email'
            type='email'
            placeholder='Email'
            required
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
            required
            value={password}
            onChange={updatePassword}
          />
          </div>
          <div className='login-page-buttons-container'>
          <button onClick={demo1Login} className='sign-in-button' type='submit'>Demo User 1</button>
          <button onClick={demo2Login} className='sign-in-button' type='submit'>Demo User 2</button>
          <button className='sign-in-button' type='submit'>Sign In</button>
          </div>
      </form>
      <div className='login-footer'>
            <NavLink to={'/sign-up'}>
            Sign Up
            </NavLink>
      </div>
    </div>
  );
};

export default LoginForm;
