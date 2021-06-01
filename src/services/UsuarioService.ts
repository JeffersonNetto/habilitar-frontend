import User from "../models/User";
import AlterarSenhaViewModel from "../view-models/AlterarSenhaViewModel";
import ServiceBase from "./ServiceBase";
import api from "../interceptor/http-interceptor";

const url = "usuario/";

const UsuarioService = () => {
  const { GetAll, Insert, Update, Get } = ServiceBase<User>(url);

  const AlterarSenha = async (body: AlterarSenhaViewModel, id?: string) => {
    try {
      const { data } = await api.put(`${url}alterar-senha/${id}`, body);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { GetAll, Insert, Update, AlterarSenha, Get };
};

export default UsuarioService;
