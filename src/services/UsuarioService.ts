import User from "../models/User";
import AlterarSenhaViewModel from "../view-models/AlterarSenhaViewModel";
import api from "../interceptor/http-interceptor";
import { Delete, Get, GetAll, GetCombo, Insert, Update } from "./ServiceBase";
import { TipoUsuario } from "../view-models/TipoUsuario";
import { CustomResponse } from "../helpers/Retorno";
import ComboBase from "../view-models/ComboBase";

const url = "/usuario";

const UsuarioService = {
  GetAll: async () => {
    return await GetAll<User>(url);
  },
  Get: async (id: string | number) => {
    return await Get<User>(url, id);
  },
  Insert: async (body: User) => {
    return await Insert(url, body);
  },
  Update: async (body: User, id?: string | number) => {
    return await Update(url, body, id);
  },
  Delete: async (id: string | number) => {
    return await Delete(url, id);
  },
  GetCombo: async (tipoUsuario?: TipoUsuario) => {
    try {
      const { data } = await api.get<CustomResponse<ComboBase<string>[]>>(
        `${url}/combo/${tipoUsuario ? tipoUsuario : ""}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
  AlterarSenha: async (body: AlterarSenhaViewModel, id?: string) => {
    try {
      const { data } = await api.put(`${url}/alterar-senha/${id}`, body);
      return data;
    } catch (error) {
      throw error;
    }
  },
  ObterPerfil: async (id: string) => {
    try {
      const { data } = await api.get(`${url}/perfil/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default UsuarioService;
