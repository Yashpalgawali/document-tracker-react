import { apiClient } from "./apiClient";

export const saveRegulation = (regulation) => apiClient.post(`regulation/`,regulation)

export const getRegulationById = (id) => apiClient.get(`regulation/${id}`)

export const getAllRegulations = () => apiClient.get(`regulation/`)

export const updateRegulation = (regulation) => apiClient.put(`regulation/`,regulation)
