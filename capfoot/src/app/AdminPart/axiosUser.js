import axios from 'axios';

// Create an instance of axios for user routes
const axiosUser = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Base URL for user API
    withCredentials: true, // Ensure cookies are sent with the request
});

export default axiosUser;
