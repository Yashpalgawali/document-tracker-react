import { apiClient } from "./apiClient"

export const saveRegulationType = (regulationtype) => apiClient.post(`regulationtype/`,regulationtype)

export const getAllRegulationTypes = () => apiClient.get(`regulationtype/`)

export const getRegulationTypeById = (id) => apiClient.get(`regulationtype/${id}`)

export const updateRegulationType = (regulationtype) => apiClient.put(`regulationtype/`,regulationtype)
