import Usuario from "../models/Usuario";
import ServiceBase from "./ServiceBase";

const url = "usuario";

const UsuarioService = () => {
  const { GetAll, Insert } = ServiceBase<Usuario>(url);

  return { GetAll, Insert };
};

export default UsuarioService;
