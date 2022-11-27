
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  return (
    <nav>
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
    </nav>
  );
}

export default NavBar;
