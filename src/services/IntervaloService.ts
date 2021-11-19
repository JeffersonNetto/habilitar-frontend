import Intervalo from "../models/Intervalo";
import { Delete, Get, GetAll, GetCombo, Insert, Update } from "./ServiceBase";

const url = "/intervalo";

const IntervaloService = {
  GetAll: async () => {
    return await GetAll<Intervalo>(url);
  },
  Get: async (id: string | number) => {
    return await Get<Intervalo>(url, id);
  },
  Insert: async (body: Intervalo) => {
    return await Insert(url, body);
  },
  Update: async (body: Intervalo, id: string | number) => {
    return await Update(url, body, id);
  },
  Delete: async (id: string | number) => {
    return await Delete(url, id);
  },
  GetCombo: async () => {
    return await GetCombo(url);
  },
};

export default IntervaloService;
