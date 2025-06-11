// services/api.js
import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api/menus';

export const getMenus = () => axios.get(BASE_URL);
export const getMenu = (id) => axios.get(`${BASE_URL}/${id}`);
export const createMenu = (data) => axios.post(BASE_URL, data);
export const addMenuItem = (id, itemData) => axios.post(`${BASE_URL}/${id}/items`, itemData);
export const deleteMenuItem = (menuId, itemId) => axios.delete(`${BASE_URL}/${menuId}/items/${itemId}`);
export const updateMenuItem = (menuId, itemId, itemData) => axios.put(`${BASE_URL}/${menuId}/items/${itemId}`, itemData);
export const deleteMenu = (menuId) => axios.delete(`${BASE_URL}/${menuId}`);

