/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable consistent-return */
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import { login, googleLogin } from '../actions/auth';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

function Login(props) {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    // eslint-disable-next-line no-shadow
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    // eslint-disable-next-line no-shadow
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          // eslint-disable-next-line react/destructuring-assignment
          props.history.push('/profile');
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  const google = () => {
    window.open('http://localhost:8080/auth/google', '_self');

    setLoading(true);
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(googleLogin())
        .then(() => {
          // eslint-disable-next-line react/destructuring-assignment
          props.history.push('/profile');
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const github = () => {
    window.open('http://localhost:8080/auth/github', '_self');
  };

  return (
    <>
      {/* <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form onSubmit={handleLogin} ref={form}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                <span className="spinner-border spinner-border-sm" />
                )}
                <span>Login</span>
              </button>
              <Link to="/forgot-password" style={{ marginLeft: '5px' }}>
                <span>Forgot Password?</span>
              </Link>
            </div>
            <CheckButton style={{ display: 'none' }} ref={checkBtn} />
          </Form>
        </div>
      </div> */}
      <div className="login">
        <h1 className="loginTitle">Choose a Login Method</h1>
        <div className="wrapper">
          <div className="left">
            <div className="loginButton google" onClick={google}>
              Google
            </div>
            <div className="loginButton github" onClick={github}>
              Github
            </div>
          </div>
          <div className="center">
            <div className="line" />
            <div className="or">OR</div>
          </div>
          <div className="right">

            <Form onSubmit={handleLogin} ref={form}>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
                placeholder="username"
              />

              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
                placeholder="password"
              />

              <button style={{ marginTop: '5px' }} className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                <span className="spinner-border spinner-border-sm" />
                )}
                <span>Login</span>
              </button>
              <Link to="/forgot-password" style={{ marginLeft: '5px', marginTop: '5px' }}>
                <span>
                  Forgot Password?
                </span>
              </Link>

              <CheckButton style={{ display: 'none' }} ref={checkBtn} />
            </Form>

          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
