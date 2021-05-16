import Entity from "./Entity";
import Exercicio from "./Exercicio";
import Metrica from "./Metrica";

export default interface ExercicioMetrica extends Entity {
  ExercicioId: number;
  MetricaId: number;
  Exercicio: Exercicio;
  Metrica: Metrica;
}
