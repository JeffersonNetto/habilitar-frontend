import Grupo from "../models/Grupo";
import ServiceBase from "./ServiceBase";

const url = "grupo/";

const GrupoService = () => {
  const { GetAll, Insert, Update, Delete } = ServiceBase<Grupo>(url);

  return { GetAll, Insert, Update, Delete };
};

export default GrupoService;
