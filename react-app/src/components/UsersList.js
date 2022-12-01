import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar';
import './UserList.css'
function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);
  console.log(users)

  const userComponents = users.map((user) => {
    return (
      <li className='user-list-li' key={user.id}>
        {user.username}
      </li>
    );
  });

  return (
    <>
      <NavBar />
      <div className='user-list-wrapper'>
        <div className='user-list-container'>
          <h1>Usernames available for interactions: </h1>
          <ul>{userComponents}</ul>
        </div>
      </div>
    </>
  );
}

export default UsersList;
