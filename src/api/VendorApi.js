import { apiClient } from "../api/apiClient";

export const registerVendor = (vendor) => apiClient.post(`vendor/`,vendor)

export const getAllVendors = ()=>apiClient.get(`vendor/`)

