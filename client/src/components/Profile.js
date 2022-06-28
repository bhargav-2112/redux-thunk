/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function Profile() {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong>
          {' '}
          Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong>
        {' '}
        {currentUser.accessToken.substring(0, 20)}
        {' '}
        ...
        {' '}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong>
        {' '}
        {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong>
        {' '}
        {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles
            && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
}
