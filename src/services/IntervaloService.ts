import Intervalo from "../models/Intervalo";
import ServiceBase from "./ServiceBase";

const url = "intervalo/";

const IntervaloService = () => {
  const { GetAll, Insert, Update, Delete } = ServiceBase<Intervalo>(url);

  return { GetAll, Insert, Update, Delete };
};

export default IntervaloService;
