import api from "./api" 

  

export const getMissions = async () => { 

  const response = await api.get("missions/") 

  return response.data 

} 

  

export const getMission = async (id) => { 

  const response = await api.get(`missions/${id}/`) 

  return response.data 

} 

  

export const createMission = async (data) => { 

  const response = await api.post("missions/", data) 

  return response.data 

} 

  

export const updateMission = async (id, data) => { 

  const response = await api.put(`missions/${id}/`, data) 

  return response.data 

} 

  

export const deleteMission = async (id) => { 

  await api.delete(`missions/${id}/`) 

} 

  

export const generateBadge = async (id) => { 

  const response = await api.post(`missions/${id}/badge/`) 

  return response.data.mission 

} 