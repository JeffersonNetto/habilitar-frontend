import User from "../models/User";
import ServiceBase from "./ServiceBase";

const url = "usuario";

const UsuarioService = () => {
  const { GetAll, Insert, Update } = ServiceBase<User>(url);

  return { GetAll, Insert, Update };
};

export default UsuarioService;
