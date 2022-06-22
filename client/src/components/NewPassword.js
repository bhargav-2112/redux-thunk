/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { newPassword } from '../actions/auth';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

function NewPassword() {
  const form = useRef();
  const { data } = useSelector((state) => state.auth);
  const checkBtn = useRef();
  const [password, setPassword] = useState('');
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangePassword = (e) => {
    // eslint-disable-next-line no-shadow
    const password = e.target.value;
    setPassword(password);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();
    // eslint-disable-next-line no-underscore-dangle
    if (checkBtn.current.context._errors.length === 0) {
      console.log('data', data);
      dispatch(newPassword(password, data))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Form onSubmit={handleSubmit} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Submit</button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
}

export default NewPassword;
