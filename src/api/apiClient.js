import axios from "axios";

export const apiClient = axios.create({
    baseURL : 'http://localhost:1212/new-document-tracker/'
})