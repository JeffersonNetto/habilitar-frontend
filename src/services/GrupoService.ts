import Grupo from "../models/Grupo";
import { Delete, Get, GetAll, GetCombo, Insert, Update } from "./ServiceBase";

const url = "/grupo";

const GrupoService = {
  GetAll: async () => {
    return await GetAll<Grupo>(url);
  },
  Get: async (id: string | number) => {
    return await Get<Grupo>(url, id);
  },
  Insert: async (body: Grupo) => {
    return await Insert(url, body);
  },
  Update: async (body: Grupo, id: string | number) => {
    return await Update(url, body, id);
  },
  Delete: async (id: string | number) => {
    return await Delete(url, id);
  },
  GetCombo: async () => {
    return await GetCombo(url);
  },
};

export default GrupoService;
