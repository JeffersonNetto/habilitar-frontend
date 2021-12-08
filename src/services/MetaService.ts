import Meta from "../models/Meta";
import { Delete, Get, GetAll, Insert, Update } from "./ServiceBase";

const url = "/meta";

const MetaService = {
  GetAll: async () => {
    return await GetAll<Meta>(url);
  },
  Get: async (id: string | number) => {
    return await Get<Meta>(url, id);
  },
  Insert: async (body: Meta) => {
    return await Insert(url, body);
  },
  Update: async (body: Meta, id: string | number) => {
    return await Update(url, body, id);
  },
  Delete: async (id: string | number) => {
    return await Delete(url, id);
  },
};

export default MetaService;
