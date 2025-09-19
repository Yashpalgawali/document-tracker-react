import { apiClient } from "./apiClient";

export const isUserEmailUsed = (email) => apiClient.get(`users/email/${email}`)