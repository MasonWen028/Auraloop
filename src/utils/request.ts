import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { isElectron } from "./platformDetector";

// Global base URL
const baseURL: string = "https://localhost:7164";

// String(isDev ? "/api/netease" : import.meta.env["VITE_API_URL"]);

// Basic configuration
const server: AxiosInstance = axios.create({
  baseURL,
  // Allow cross-origin requests
  withCredentials: true,
  // Request timeout
  timeout: 15000,
});

// Request interceptor
server.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {

    // Add cookie if not excluded and the user is logged in or a specific cookie exists
    // if (!request.params.noCookie && (isLogin() || getCookie("MUSIC_U") !== null)) {
    //   const cookie = `MUSIC_U=${getCookie("MUSIC_U")};`;
    //   request.params.cookie = encodeURIComponent(cookie);
    // }

    // Add realIP unless the request is for login
    if (!isElectron && !request.url?.includes("/login")) {
      //request.params.realIP = "116.25.146.177";
    }


    // Return the request object to proceed
    return request;
  },
  (error: AxiosError) => {
    console.error("Failed to send request:", error);
    return Promise.reject(error);
  },
);

// Response interceptor
server.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.isSuccess) {
      return Promise.resolve(response.data);
    }
    console.log(response)
    return Promise.resolve(response);
  },
  (error: AxiosError) => {
    const { response } = error;

    // Handle HTTP status codes
    switch (response?.status) {
      case 400:
        console.error("Client error:", response.status, response.statusText);
        // Handle client-side error logic
        break;
      case 401:
        console.error("Unauthorized:", response.status, response.statusText);
        // Handle unauthorized access logic
        break;
      case 403:
        console.error("Forbidden:", response.status, response.statusText);
        // Handle forbidden access logic
        break;
      case 404:
        console.error("Resource not found:", response.status, response.statusText);
        // Handle resource not found logic
        break;
      case 500:
        console.error("Server error:", response.status, response.statusText);
        // Handle server-side error logic
        break;
      default:
        // Handle other status codes or error conditions
        console.error("Unhandled error:", error.message);
    }

    // Show notification for the error

    // Reject the error
    return Promise.reject(error);
  },
);

// Request function
const request = async (config: AxiosRequestConfig): Promise<any> => {
  // Send the request and return the data
  const { data } = await server.request(config);
  return data as any;
};

export default request;
