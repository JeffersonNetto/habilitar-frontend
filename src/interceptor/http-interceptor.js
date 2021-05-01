import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (
      !config.url.endsWith("login") ||
      !config.url.endsWith("refresh") ||
      !config.url.endsWith("signup")
    ) {
      // const token = localStorage.getItem("token");
      // if (token) {
      //   let t = "Bearer " + token;
      //   config.headers.Authorization = t;
      // }
    }

    return config;
  },
  (error) => {
    // I cand handle a request with errors here
    return Promise.reject(error);
  }
);

export default axiosInstance;
