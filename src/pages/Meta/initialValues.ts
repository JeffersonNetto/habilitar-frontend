import Empresa from "../../models/Empresa";
import Exercicio from "../../models/Exercicio";
import Intervalo from "../../models/Intervalo";
import Meta from "../../models/Meta";
import Metrica from "../../models/Metrica";
import User from "../../models/User";

const initialValues: Meta = {
  Id: 0,
  Ativo: true,
  ExercicioId: 0,
  EmpresaId: 0,
  IntervaloId: 0,
  MetricaId: 0,
  MetricaQtd: 0,
  QtdSeries: 0,
  Ip: "",
  Empresa: {} as Empresa,
  Exercicio: {} as Exercicio,
  Fisiotepeuta: {} as User,
  Intervalo: {} as Intervalo,
  Metrica: {} as Metrica,
};

export default initialValues;
