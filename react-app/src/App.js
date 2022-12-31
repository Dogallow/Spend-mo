import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import RequestForm from './components/RequestForm';
import UserTransactions from './components/Transactions/UserTransactions';
import Incomplete from './components/Incomplete';
import Posts from './components/Posts';
import './app.css'
import {Deposit, Withdraw} from './components/Transfer';
import SinglePost from './components/Posts/SinglePost'
import Instructions from './components/Instructions/Instructions';
import EmptyPage from './components/EmptyPage';
import Comments from './components/Comments';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/form' exact={true} >
          <RequestForm />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <Posts />
        </ProtectedRoute>
        <ProtectedRoute path='/notifications' exact={true} >
          <UserTransactions />
        </ProtectedRoute>
        <ProtectedRoute path='/incomplete' exact={true} >
          <Incomplete />
        </ProtectedRoute>
        <ProtectedRoute path='/transfer/deposit' exact={true} >
          <Deposit />
        </ProtectedRoute>
        <ProtectedRoute path='/transfer/withdraw' exact={true} >
          <Withdraw />
        </ProtectedRoute>
        <ProtectedRoute path='/instructions' exact={true} >
          <Instructions />
        </ProtectedRoute>
        <ProtectedRoute path='/comments/:postId' exact={true} >
          <Comments />
        </ProtectedRoute>
        <Route>
          <EmptyPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
