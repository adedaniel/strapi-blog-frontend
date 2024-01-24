import axios, { AxiosError, AxiosResponse } from "axios";
import Router from "next/router";
import queryClient from "./queries";

/**
 * Creates an instance of an axios client with authentication headers
 * @param {string} baseURL - base URL for the API
 */
export const authlessFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

const authedFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

/**
 * Creates an instance of an axios client with authentication headers
 * @param {string} baseURL - base URL for the API
 */
authedFetch.interceptors.request.use(
  (config: any) => {
    // Get the access token from local storage
    const token = localStorage.getItem("jenesys_acccess_token");

    // Check if there is an access token
    if (token) {
      // Add the access token to the headers
      config.headers["Authorization"] = `Bearer ${token}`;
      // Return the updated config
      return config;
    }

    // Invalidate the queries and clear the cache
    queryClient.invalidateQueries();
    queryClient.clear();

    // Redirect to the login page if the access token is not present
    Router.push("/login");
  },
  (error: AxiosError) => {
    // Reject the request if there is an error
    return Promise.reject(error);
  }
);

/**
 * Interceptor for the authedFetch instance to handle authentication errors
 */
authedFetch.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return the response
    return response;
  },
  (error: AxiosError) => {
    // Check if the error is a 401 unauthorized error
    if (error.response?.status === 401) {
      // Invalidate the queries and clear the cache
      queryClient.invalidateQueries();
      queryClient.clear();

      // Redirect to the login page
      Router.push("/login");
    }

    // Reject the request if there is an error
    return Promise.reject(error);
  }
);

export default authedFetch;
