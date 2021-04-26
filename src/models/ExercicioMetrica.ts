import Entity from "./Entity";
import Exercicio from "./Exercicio";
import Metrica from "./Metrica";

export default class ExercicioMetrica extends Entity {
  ExercicioId!: number;
  MetricaId!: number;
  Exercicio!: Exercicio;
  Metrica!: Metrica;
}
