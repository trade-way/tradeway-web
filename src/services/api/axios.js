import axios from 'axios';
import { API_ENDPOINTS, PUBLIC_ENDPOINTS } from '@/services/endpoint';

/**
 * Function to format URL with parameters
 * Replaces path parameters (e.g., :id) with actual values
 */
const formatUrl = (url, params = {}) => {
  let formattedUrl = url;
  
  Object.keys(params).forEach(key => {
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
  return PUBLIC_ENDPOINTS.some(endpoint => url.startsWith(endpoint));
};

// Token refresh logic
let refreshTokenPromise = null;

const refreshToken = async () => {
  if (!refreshTokenPromise) {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    
    refreshTokenPromise = axios.post(
      `${baseURL}/${API_ENDPOINTS.authentication.refreshToken}`,
      { refresh_token: localStorage.getItem('refresh_token') },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then(response => {
      localStorage.setItem('auth_token', response.data.access_token);
      if (response.data.refresh_token) {
        localStorage.setItem('refresh_token', response.data.refresh_token);
      }
      return response.data.access_token;
    })
    .catch(() => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
      return Promise.reject('Refresh token failed');
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
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    // timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Only add authorization header for protected endpoints
      if (!isPublicEndpoint(config.url)) {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => {
      return response.data;
    },
    async (error) => {
      const { config, response } = error;
      const originalRequest = config;
      
      // If the error is 401 and we haven't retried yet
      if (response && response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const newToken = await refreshToken();
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      
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
  }
};

export { api, API_ENDPOINTS };
