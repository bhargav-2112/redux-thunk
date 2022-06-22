import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const register = (username, email, password) => axios.post(`${API_URL}signup`, {
  username,
  email,
  password,
});

const login = (username, password) => axios.post(`${API_URL}signin`, {
  username,
  password,
}).then((response) => {
  if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
});

const logout = () => {
  localStorage.removeItem('user');
};

const reset = (email) => axios.post(`${API_URL}forgot-password`, {
  email,
});

const newPassword = (password, data) => axios.post(`${API_URL}pwd-reset/${data.id}/${data.token}`, {
  password,
});

export default {
  register,
  login,
  logout,
  reset,
  newPassword,
};
