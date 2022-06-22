import {
  REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE,
  RESET_PASSWORD_SUCCESS, NEW_PASSWORD_SUCCESS,
} from './types';
import authService from '../services/auth.service';

export const register = (username, email, password) => (dispatch) => // thunk
  // eslint-disable-next-line implicit-arrow-linebreak
  authService.register(username, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    },
  );

export const reset = (email) => (dispatch) => authService.reset(email).then(
  (response) => {
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: response.data,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });
    return Promise.resolve();
  },
);

// eslint-disable-next-line max-len
export const newPassword = (password, data) => (dispatch) => authService.newPassword(password, data).then(
  (response) => {
    dispatch({
      type: NEW_PASSWORD_SUCCESS,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });
    return Promise.resolve();
  },
);

// eslint-disable-next-line max-len
export const login = (username, password) => (dispatch) => authService.login(username, password).then( // thunk is used to dispatch action
  (data) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: data },
    });

    return Promise.resolve();
  },
  (error) => {
    const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
    return Promise.reject();
  },
);

export const logout = () => (dispatch) => {
  authService.logout();
  dispatch({
    type: LOGOUT,
  });
};
