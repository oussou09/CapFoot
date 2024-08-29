// axiosConfig.js
import axios from 'axios';
import Cookies from 'js-cookie';

// Retrieve the token from cookies
const token = Cookies.get('admin_token');

// Set the default Authorization header for all Axios requests if the token exists
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
    // Remove the Authorization header if no token exists
    delete axios.defaults.headers.common['Authorization'];
}

// You can also set other default configurations if needed
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'; // Base URL for your API

export default axios;
