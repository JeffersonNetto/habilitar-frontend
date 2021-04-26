import Exercicio from "../models/Exercicio";
import ServiceBase from "./ServiceBase";

const url = "exercicio/";

const ExercicioService = () => {
  const { GetAll, Insert, Update, Delete } = ServiceBase<Exercicio>(url);

  return { GetAll, Insert, Update, Delete };
};

export default ExercicioService;
