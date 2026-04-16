import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const authProvider = {
  login: async ({ username, password }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: username,
        password: password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return Promise.resolve();
      }
      return Promise.reject();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getPermissions: () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return Promise.resolve(user?.role || 'admin');
    } catch {
      return Promise.resolve('admin');
    }
  },
};

export default authProvider;
