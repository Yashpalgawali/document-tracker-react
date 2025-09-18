import { apiClient } from "../../../training-tracker/src/Components/api/apiClient";

export const saveNotification = (notification) => apiClient.post(`notification/`,notification)

export const getAllNotifications = () => apiClient.get(`notification/`)

export const getNotificationById = (id) => apiClient.get(`notification/${id}`)

export const updateNotification = (notification) => apiClient.put(`notification/`,notification)