// services/api.js
import axios from 'axios';
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/menus`;

export const getMenus = () => axios.get(BASE_URL);
export const getMenu = (id) => axios.get(`${BASE_URL}/${id}`);
export const createMenu = (data) => axios.post(BASE_URL, data);
export const addMenuItem = (id, itemData) => axios.post(`${BASE_URL}/${id}/items`, itemData);
export const deleteMenuItem = (menuId, itemId) => axios.delete(`${BASE_URL}/${menuId}/items/${itemId}`);
export const updateMenuItem = (menuId, itemId, itemData) => axios.put(`${BASE_URL}/${menuId}/items/${itemId}`, itemData);
export const deleteMenu = (menuId) => axios.delete(`${BASE_URL}/${menuId}`);

