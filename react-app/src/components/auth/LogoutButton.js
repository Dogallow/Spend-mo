import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import { clearTransaction } from '../../store/transactions';
import { clearWallet } from '../../store/wallet';

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    dispatch(clearTransaction())
    dispatch(clearWallet())
    history.push('/login')
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
