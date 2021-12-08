import Exercicio from "../models/Exercicio";
import { Delete, Get, GetAll, GetCombo, Insert, Update } from "./ServiceBase";

const url = "/exercicio";

const ExercicioService = {
  GetAll: async () => {
    return await GetAll<Exercicio>(url);
  },
  Get: async (id: string | number) => {
    return await Get<Exercicio>(url, id);
  },
  Insert: async (body: Exercicio) => {
    return await Insert(url, body);
  },
  Update: async (body: Exercicio, id: string | number) => {
    return await Update(url, body, id);
  },
  Delete: async (id: string | number) => {
    return await Delete(url, id);
  },
  GetCombo: async () => {
    return await GetCombo(url);
  },
};

export default ExercicioService;
