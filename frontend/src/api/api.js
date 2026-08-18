import axios from "axios" 

  

const api = axios.create({ 

  baseURL: "/api/v1/", 

  withCredentials: true, 

}) 

  

let accessToken = null 

let refreshPromise = null 

  

export const setAccessToken = (token) => { 

  accessToken = token 

} 

  

export const clearAccessToken = () => { 

  accessToken = null 

} 

  

api.interceptors.request.use((config) => { 

  if (accessToken) { 

    config.headers.Authorization = `Bearer ${accessToken}` 

  } 

  return config 

}) 

  

const refreshAccessToken = async () => { 

  if (!refreshPromise) { 

    refreshPromise = api 

      .post("users/refresh/") 

      .then((response) => { 

        setAccessToken(response.data.access) 

        return response.data.access 

      }) 

      .finally(() => { 

        refreshPromise = null 

      }) 

  } 

  

  return refreshPromise 

} 

  

api.interceptors.response.use( 

  (response) => response, 

  async (error) => { 

    const originalRequest = error.config 

  

    const is401 = error.response?.status === 401 

    const isRefreshRequest = 

      originalRequest?.url?.includes("users/refresh/") 

  

    if ( 

      is401 && 

      !isRefreshRequest && 

      !originalRequest?._retry 

    ) { 

      originalRequest._retry = true 

  

      try { 

        const newAccessToken = await refreshAccessToken() 

        originalRequest.headers.Authorization = 

          `Bearer ${newAccessToken}` 

        return api(originalRequest) 

      } catch (refreshError) { 

        clearAccessToken() 

        return Promise.reject(refreshError) 

      } 

    } 

  

    return Promise.reject(error) 

  } 

) 

  

export default api 