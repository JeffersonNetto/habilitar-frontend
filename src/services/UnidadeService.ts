import Unidade from "./../models/Unidade";
import { Delete, Get, GetAll, GetCombo, Insert, Update } from "./ServiceBase";

const url = "/unidade";

const UnidadeService = {
  GetAll: async () => {
    return await GetAll<Unidade>(url);
  },
  Get: async (id: string | number) => {
    return await Get<Unidade>(url, id);
  },
  Insert: async (body: Unidade) => {
    return await Insert(url, body);
  },
  Update: async (body: Unidade, id: string | number) => {
    return await Update(url, body, id);
  },
  Delete: async (id: string | number) => {
    return await Delete(url, id);
  },
  GetCombo: async () => {
    return await GetCombo(url);
  },
};

export default UnidadeService;
