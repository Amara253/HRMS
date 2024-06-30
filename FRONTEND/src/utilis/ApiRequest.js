import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust the base URL according to your API endpoint
});


// Add interceptor to include access token in the request headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    // console.log(document.cookie);
    if (accessToken) {
      // console.log("Access Token:", accessToken);
      // Add the access token to the request headers
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.log("Access Token not found in document.cookie");
      // Handle the absence of the access token...
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
