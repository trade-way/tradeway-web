// Modified version of axios.js with proper auth handling

import axios from "axios";
import { API_ENDPOINTS, PUBLIC_ENDPOINTS } from "@/services/endpoint";

/**
 * Function to format URL with parameters
 * Replaces path parameters (e.g., :id) with actual values
 */
const formatUrl = (url, params = {}) => {
  let formattedUrl = url;

  Object.keys(params).forEach((key) => {
    if (formattedUrl.includes(`:${key}`)) {
      formattedUrl = formattedUrl.replace(`:${key}`, params[key]);
      delete params[key]; // Remove used parameters
    }
  });

  return formattedUrl;
};

/**
 * Function to check if an endpoint is public
 */
const isPublicEndpoint = (url) => {
  return PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint));
};

// Token refresh logic
let refreshTokenPromise = null;

const refreshToken = async () => {
  if (!refreshTokenPromise) {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const cleanBaseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    const refreshTokenEndpoint = API_ENDPOINTS.authentication.refreshToken;
    
    // Get refresh token from storage
    const refreshTokenValue = localStorage.getItem("refresh_token");
    if (!refreshTokenValue) {
      console.error("No refresh token available");
      // Clean up auth state and redirect to login
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/login";
      return Promise.reject("No refresh token available");
    }
    
    // Log the complete URL for debugging
    const fullUrl = `${cleanBaseURL}/${refreshTokenEndpoint}`;
    console.log("Refresh token URL:", fullUrl);
    
    refreshTokenPromise = axios
      .post(
        fullUrl,
        { refresh_token: refreshTokenValue },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log("Refresh token response:", response.data);
        
        // Extract tokens based on your API response structure
        // Adjust these keys to match your backend response
        const newToken = response.data.access || response.data.token || response.data.access_token;
        
        if (!newToken) {
          console.error("No token found in refresh response:", response.data);
          throw new Error("Invalid token response");
        }
        
        // Store new access token
        localStorage.setItem("auth_token", newToken);
        
        // If the response includes a new refresh token, store that too
        if (response.data.refresh || response.data.refresh_token) {
          const newRefreshToken = response.data.refresh || response.data.refresh_token;
          localStorage.setItem("refresh_token", newRefreshToken);
        }
        
        console.log("Token refresh successful");
        return newToken; // Return the new token so it can be used by the interceptor
      })
      .catch((error) => {
        console.error("Refresh token failed:", error);
        console.error("Full URL that failed:", fullUrl);
        
        // Only redirect if there's an auth failure, not for URL or server errors
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // Clean up auth state
          localStorage.removeItem("auth_token");
          localStorage.removeItem("refresh_token");
          
          // Use setTimeout to avoid redirect during an ongoing request/response cycle
          setTimeout(() => {
            window.location.href = "/login";
          }, 100);
        }
        
        return Promise.reject(error);
      })
      .finally(() => {
        refreshTokenPromise = null;
      });
  }
  
  return refreshTokenPromise;
};

/**
 * Create HTTP client with interceptors
 */
const createHttpClient = () => {
  // Ensure baseURL doesn't end with a slash
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const cleanBaseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
  
  const client = axios.create({
    baseURL: cleanBaseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Skip auth for public endpoints
      if (isPublicEndpoint(config.url)) {
        return config;
      }
      
      // Add auth token to protected endpoints
      const token = localStorage.getItem("auth_token");
      console.log(`Requesting ${config.url} with token: ${token ? "present" : "absent"}`);
      
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => {
      // Handle successful responses
      console.log(`Response received for ${response.config.url}`);
      return response.data;
    },
    async (error) => {
      const { config, response } = error;
      
      // Skip retry for specific endpoints
      const skipRetryEndpoints = [
        API_ENDPOINTS.authentication.login,
        API_ENDPOINTS.authentication.refreshToken,
        API_ENDPOINTS.authentication.logout
      ];
      
      const shouldSkipRetry = skipRetryEndpoints.some(endpoint => 
        config.url.includes(endpoint)
      );
      
      // Handle 401 Unauthorized errors (except for the specific endpoints)
      if (response && response.status === 401 && !config._retry && !shouldSkipRetry) {
        config._retry = true;
        console.log(`Attempting token refresh for ${config.url}`);
        
        try {
          // Try to refresh the token
          const newToken = await refreshToken();
          
          // Update the auth header with new token
          config.headers["Authorization"] = `Bearer ${newToken}`;
          
          // Retry the original request
          return axios(config);
        } catch (refreshError) {
          console.error("Token refresh failed, rejecting request:", refreshError);
          return Promise.reject(refreshError);
        }
      }
      
      // For all other errors
      return Promise.reject(error);
    }
  );

  return client;
};

// Create the base HTTP client
const httpClient = createHttpClient();

/**
 * API object with direct method access
 */
const api = {
  get: (endpoint, params = {}, config = {}) => {
    const url = formatUrl(endpoint, params);
    return httpClient.get(url, { params, ...config });
  },

  post: (endpoint, data = {}, params = {}, config = {}) => {
    const url = formatUrl(endpoint, params);
    return httpClient.post(url, data, config);
  },

  put: (endpoint, data = {}, params = {}, config = {}) => {
    const url = formatUrl(endpoint, params);
    return httpClient.put(url, data, config);
  },

  patch: (endpoint, data = {}, params = {}, config = {}) => {
    const url = formatUrl(endpoint, params);
    return httpClient.patch(url, data, config);
  },

  delete: (endpoint, params = {}, config = {}) => {
    const url = formatUrl(endpoint, params);
    return httpClient.delete(url, { params, ...config });
  },
};

export { api, API_ENDPOINTS };