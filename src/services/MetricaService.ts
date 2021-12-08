import Metrica from "../models/Metrica";
import { Delete, Get, GetAll, GetCombo, Insert, Update } from "./ServiceBase";

const url = "/metrica";

const MetricaService = {
  GetAll: async () => {
    return await GetAll<Metrica>(url);
  },
  Get: async (id: string | number) => {
    return await Get<Metrica>(url, id);
  },
  Insert: async (body: Metrica) => {
    return await Insert(url, body);
  },
  Update: async (body: Metrica, id: string | number) => {
    return await Update(url, body, id);
  },
  Delete: async (id: string | number) => {
    return await Delete(url, id);
  },
  GetCombo: async () => {
    return await GetCombo(url);
  },
};

export default MetricaService;
