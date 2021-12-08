import Empresa from "../models/Empresa";
import { Delete, Get, GetAll, GetCombo, Insert, Update } from "./ServiceBase";

const url = "/empresa";

const EmpresaService = {
  GetAll: async () => {
    return await GetAll<Empresa>(url);
  },
  Get: async (id: string | number) => {
    return await Get<Empresa>(url, id);
  },
  Insert: async (body: Empresa) => {
    return await Insert(url, body);
  },
  Update: async (body: Empresa, id: string | number) => {
    return await Update(url, body, id);
  },
  Delete: async (id: string | number) => {
    return await Delete(url, id);
  },
  GetCombo: async () => {
    return await GetCombo(url);
  },
};

export default EmpresaService;
