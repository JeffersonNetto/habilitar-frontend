import Unidade from "./../models/Unidade";
import ServiceBase from "./ServiceBase";

const url = "unidade/";

const UnidadeService = () => {
  const { GetAll, Insert, Update, Delete } = ServiceBase<Unidade>(url);

  return { GetAll, Insert, Update, Delete };
};

export default UnidadeService;
