import axios from 'axios';

// Create an Axios instance with the base URL set to your Laravel backend
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',  // Update this if your backend runs on a different URL or port
    withCredentials: true,  // Ensure cookies are sent with requests
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Function to fetch CSRF token and set it as a header in Axios instance
export const initializeCsrfToken = async () => {
    try {
        // Request to get the CSRF cookie from Laravel Sanctum
        await axiosInstance.get('/sanctum/csrf-cookie');
        const tokenMatch = document.cookie.match(/XSRF-TOKEN=([^;]*)/);

        if (tokenMatch) {
            const csrfToken = tokenMatch[1];
            // Set the CSRF token as a default header for all future requests
            axiosInstance.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
            return csrfToken;
        } else {
            console.error('CSRF token not found in cookies.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw new Error('Failed to fetch CSRF token.');
    }
};

// Axios interceptor to automatically attach CSRF token to headers for each request
axiosInstance.interceptors.request.use(config => {
    const token = document.cookie.match(/XSRF-TOKEN=([^;]*)/);
    if (token) {
        config.headers['X-XSRF-TOKEN'] = token[1];  // Attach CSRF token to the headers
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;
