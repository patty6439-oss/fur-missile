import api, { 

  clearAccessToken, 

  setAccessToken, 

} from "./api" 

  

export const register = async (formData) => { 

  const response = await api.post("users/register/", formData) 

  setAccessToken(response.data.access) 

  return response.data 

} 

  

export const login = async (formData) => { 

  const response = await api.post("users/login/", formData) 

  setAccessToken(response.data.access) 

  return response.data 

} 

  

export const logout = async () => { 

  try { 

    await api.post("users/logout/") 

  } finally { 

    clearAccessToken() 

  } 

} 

  

export const getCurrentUser = async () => { 

  const response = await api.get("users/info/") 

  return response.data.user 

} 

  

export const restoreSession = async () => { 

  const response = await api.post("users/refresh/") 

  setAccessToken(response.data.access) 

  return getCurrentUser() 

} 