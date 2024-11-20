import axios from "axios";

const API_URL = "https://trbotserver.vercel.app";

export const apiGetParams = async () => {
  return await axios.get(`${API_URL}/getparams`);
};

export const apiSetParams = async (data) => {
  return await axios.post(`${API_URL}/setparams`, data);
};

export const apiQueryOrder = async (data) => {
  return await axios.post(`${API_URL}/queryOrder`, data);
};

export const apiCancelOrder = async (data) => {
  return await axios.post(`${API_URL}/cancelOrder`, data);
};

export const apiCancelAllOpenOrders = async () => {
  return await axios.get(`${API_URL}/cancelAllOpenOrders`);
};

export const apiLoadAllOrders = async () => {
  return await axios.get(`${API_URL}/loadAllOrders`);
};

export const apiGetSymbols = async () => {
  return await axios.get(`${API_URL}/symbol`);
};

export const apiCreateSymbol = async (name) => {
  return await axios.post(`${API_URL}/symbol`, { name });
};

export const apiUpdateSymbol = async (id, name) => {
  return await axios.put(`${API_URL}/symbol/${id}`, { name });
};

export const apiDeleteSymbol = async (id) => {
  return await axios.delete(`${API_URL}/symbol/${id}`);
};

export const apiGetSearches = async () => {
  return await axios.get(`${API_URL}/search`);
};

export const apiUpdateSearch = async (symbol) => {
  return await axios.put(`${API_URL}/search`, { symbol });
};
