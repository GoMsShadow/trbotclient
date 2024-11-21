import axios from "axios";
import { TBParam } from "../utils/types";

const apiUrl = process.env.REACT_APP_API_URL;

export const apiGetParams = async () => {
  return await axios.get(`${apiUrl}/getparams`);
};

export const apiSetParams = async (data: Omit<TBParam, "active">) => {
  return await axios.post(`${apiUrl}/setparams`, data);
};

export const apiQueryOrder = async (data: any) => {
  return await axios.post(`${apiUrl}/queryOrder`, data);
};

export const apiCancelOrder = async (data: any) => {
  return await axios.post(`${apiUrl}/cancelOrder`, data);
};

export const apiCancelAllOpenOrders = async () => {
  return await axios.get(`${apiUrl}/cancelAllOpenOrders`);
};

export const apiLoadAllOrders = async () => {
  return await axios.get(`${apiUrl}/loadAllOrders`);
};

export const apiGetSymbols = async () => {
  return await axios.get(`${apiUrl}/symbol`);
};

export const apiCreateSymbol = async (name: string) => {
  return await axios.post(`${apiUrl}/symbol`, { name });
};

export const apiUpdateSymbol = async (id: number, name: string) => {
  return await axios.put(`${apiUrl}/symbol/${id}`, { name });
};

export const apiDeleteSymbol = async (id: number) => {
  return await axios.delete(`${apiUrl}/symbol/${id}`);
};

export const apiGetSearches = async () => {
  return await axios.get(`${apiUrl}/search`);
};

export const apiUpdateSearch = async (symbol: string) => {
  return await axios.put(`${apiUrl}/search`, { symbol });
};
