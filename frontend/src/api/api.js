import axios from "axios"; 
 
const api = axios.create({ 
  baseURL: "/api/v1/", 
  withCredentials: true, 
}); 
 
let refreshPromise = null; 
 
api.interceptors.response.use( 
  (response) => response, 
  async (error) => { 
    const originalRequest = error.config; 
    const isRefreshRequest = originalRequest?.url?.includes("users/refresh/"); 
 
    if ( 
      error.response?.status === 401 && 
      !originalRequest?._retry && 
      !isRefreshRequest 
    ) { 
      originalRequest._retry = true; 
 
      if (!refreshPromise) { 
        refreshPromise = axios 
          .post("/api/v1/users/refresh/", {}, { withCredentials: true }) 
          .finally(() => { 
            refreshPromise = null; 
          }); 
      } 
 
      await refreshPromise; 
      return api(originalRequest); 
    } 
 
    return Promise.reject(error); 
  } 
); 
 
export default api; 