import Empresa from "../models/Empresa";
import ServiceBase from "./ServiceBase";

const url = "empresa/";

const EmpresaService = () => {
  const { GetAll, Insert, Update, Delete } = ServiceBase<Empresa>(url);

  return { GetAll, Insert, Update, Delete };
};

export default EmpresaService;
