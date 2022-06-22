import React, { useState, useEffect } from 'react';
import UserService from '../services/user.service';

function BoardUser() {
  const [content, setContent] = useState('');
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        // eslint-disable-next-line no-underscore-dangle
        const _content = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();
        setContent(_content);
      },
    );
  }, []);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
}

export default BoardUser;
