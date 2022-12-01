
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import { deleteUser, deleteUserThunk } from '../store/session';
import { clearTransaction } from '../store/transactions';
import { clearWallet, getBalanceThunk } from '../store/wallet';
import LogoutButton from './auth/LogoutButton';
import './Navbar.css'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const wallet = useSelector(state => state.wallet)
  const history = useHistory()
  console.log(user)
  console.log(wallet)

  const walletInfo = wallet.wallet ?( 
    <div>
      <p style={{marginBottom:'0px'}}>${wallet.wallet.balance} in Spend-mo</p>
      <NavLink to={'/transfer/deposit'}>
        <p style={{marginTop:'0px'}}>Transfer Money</p>
      </NavLink>
    </div>
  ) : (
    null
  )

  const deleteUser = async () => {
    await dispatch(deleteUserThunk())
    await dispatch(clearTransaction())
    await dispatch(clearWallet())
    history.push('/sign-up')
  }
  
  useEffect(() => {
    dispatch(getBalanceThunk())
  },[])

  let userInfo = user !== null ? (
    <>
      <button className='avatar-container'>{user.username[0]}</button>
      <div className='user-info'>
        <h3>Hi, {user.username}</h3>
        <span>@{user.username}-{Math.floor(Math.random() *10)}</span>
      </div>
    </>
      ) : (
    null
  )

  let userButtons = user !== null ? (
    <>
      
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to='/notifications' exact={true} activeClassName='active'>
            Notifications
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
          <button className="delete-user-button-style" onClick={deleteUser}>Delete User</button>
        </li>
      
    </>
  ) : (
    <>
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
        
    </>
  )
  
  return (
    <nav>
    <div className='nav-container'>
      <NavLink to={'/'}>
        <img src='https://account.venmo.com/static/images/logo.svg' alt='logo' />
      </NavLink>
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
          {userButtons}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
