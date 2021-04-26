import Metrica from "../models/Metrica";
import ServiceBase from "./ServiceBase";

const url = "metrica/";

const MetricaService = () => {
  const { GetAll, Insert, Update, Delete } = ServiceBase<Metrica>(url);

  return { GetAll, Insert, Update, Delete };
};

export default MetricaService;
