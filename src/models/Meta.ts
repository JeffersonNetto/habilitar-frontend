import Intervalo from "./Intervalo";
import Empresa from "./Empresa";
import Metrica from "./Metrica";
import Entity from "./Entity";
import Exercicio from "./Exercicio";
import Usuario from "./User";

export default interface Meta extends Entity {
  ExercicioId: number;
  QtdSeries: number;
  MetricaId: number;
  IntervaloId: number;
  EmpresaId: number;
  FisioterapeutaId?: number;
  Empresa: Empresa;
  Exercicio: Exercicio;
  Fisiotepeuta: Usuario;
  Intervalo: Intervalo;
  Metrica: Metrica;
}
