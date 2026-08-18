import api from "./api" 

  

export const getDogs = async () => { 

  const response = await api.get("dogs/") 

  return response.data 

} 

  

export const getDog = async (id) => { 

  const response = await api.get(`dogs/${id}/`) 

  return response.data 

} 

  

export const createDog = async (data) => { 

  const response = await api.post("dogs/", data) 

  return response.data 

} 

  

export const updateDog = async (id, data) => { 

  const response = await api.put(`dogs/${id}/`, data) 

  return response.data 

} 

  

export const deleteDog = async (id) => { 

  await api.delete(`dogs/${id}/`) 

} 