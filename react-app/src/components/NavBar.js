
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './Navbar.css'

const NavBar = () => {
  return (
    <nav>
    <div className='nav-container'>
        <img src='https://account.venmo.com/static/images/logo.svg' alt='logo' />
        <div className='user-container'>
          <button className='avatar-container'>DG</button>
          <div className='user-info'>
            <h3>Hi, User</h3>
            <span>@User-6</span>
          </div>
        </div>
        <div>
          <button className='pay-request-button'>Pay or Request</button>
        </div>
        <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to='/user-transactions' exact={true} activeClassName='active'>
              User Transactions
            </NavLink>
          </li>
          <li>
            <NavLink to='/incomplete' exact={true} activeClassName='active'>
              Incomplete
            </NavLink>
          </li>
          <li>
            <NavLink to='/form' exact={true} activeClassName='active'>
              Form
            </NavLink>
          </li>
          
          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
