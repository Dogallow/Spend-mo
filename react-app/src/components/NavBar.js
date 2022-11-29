
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { NavLink } from 'react-router-dom';
import { deleteUser, deleteUserThunk } from '../store/session';
import { clearTransaction } from '../store/transactions';
import { clearWallet, getBalanceThunk } from '../store/wallet';
import LogoutButton from './auth/LogoutButton';
import './Navbar.css'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const wallet = useSelector(state => state.wallet)

  console.log(user)
  console.log(wallet)

  const walletInfo = wallet.wallet ?( 
    <div>
      <p>Wallet Balance: ${wallet.wallet.balance}</p>
      <NavLink to={'/transfer/deposit'}>
        <p>Transfer Money</p>
      </NavLink>
    </div>
  ) : (
    null
  )

  const deleteUser = async () => {
    await dispatch(deleteUserThunk(user.username))
    await dispatch(clearTransaction())
    await dispatch(clearWallet())
  }
  
  useEffect(() => {
    dispatch(getBalanceThunk())
  },[])

  let userInfo = user !== null ? (
    <>
      <button className='avatar-container'>DG</button>
      <div className='user-info'>
        <h3>Hi, {user.username}</h3>
        <span>@{user.username}-{Math.floor(Math.random() *10)}</span>
      </div>
    </>
      ) : (
    null
  )
  
  return (
    <nav>
    <div className='nav-container'>
        <img src='https://account.venmo.com/static/images/logo.svg' alt='logo' />
        <div className='user-container'>
          {userInfo}
        </div>
        <div>
          <NavLink to='/form' exact={true} activeClassName='active'>
            <button className='pay-request-button'>Pay or Request</button>
          </NavLink>
        </div>
        
          {walletInfo}
        
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
            <LogoutButton />
          </li>
          <li>
            {user !== null && <button onClick={deleteUser}>Delete User</button>}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
