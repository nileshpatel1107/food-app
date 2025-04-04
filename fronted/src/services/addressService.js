import axios from 'axios';

const API_URL = 'http://localhost:5001/useraddress';

export const getDiscounts = async () => axios.get(API_URL);
export const createDiscount = async (data) => axios.post(API_URL, data);
export const updateDiscount = async (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteDiscount = async (id) => axios.delete(`${API_URL}/${id}`);
