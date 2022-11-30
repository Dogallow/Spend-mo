import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

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
      setErrors(['Password and Repeat Password must match'])
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
    return <Redirect to='/' />;
  }

  return (
    <div className='form-container'>
    <h3>Sign Up Form</h3>
      <form className='signup-form' onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='input-section'>
          <label>First Name</label>
          <input
            type='text'
            name='first_name'
            required
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          ></input>
        </div>
        <div className='input-section'>
          <label>Last Name</label>
          <input
            type='text'
            name='lastName'
            required
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          ></input>
        </div>
        
        <div className='input-section'>
          <label>User Name</label>
          <input
            type='text'
            name='username'
            required
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className='input-section'>
          <label>Email</label>
          <input
            type='text'
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
            required
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
            required={true}
          ></input>
        </div>
        <button className='sign-up-button' type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
