import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { clearTransaction } from '../../store/transactions';
import { clearWallet } from '../../store/wallet';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    dispatch(clearTransaction())
    dispatch(clearWallet())
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
