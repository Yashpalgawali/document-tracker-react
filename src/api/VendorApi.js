import { apiClient } from "../api/apiClient";

export const registerVendor = (vendor) => apiClient.post(`vendor/`,vendor)

export const getAllVendors = ()=>apiClient.get(`vendor/`)

export const updateVendor = (vendor) => apiClient.put(`vendor/`,vendor)

export const getVendorById = (id) => apiClient.get(`vendor/${id}`)