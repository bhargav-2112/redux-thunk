import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESET_PASSWORD_SUCCESS,
} from '../actions/types';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        data: payload.data,
      };
    default:
      return state;
  }
};
