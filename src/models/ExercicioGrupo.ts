import Entity from "./Entity";
import Exercicio from "./Exercicio";
import Grupo from "./Grupo";

export default class ExercicioGrupo extends Entity {
  ExercicioId!: number;
  GrupoId!: number;
  Exercicio!: Exercicio;
  Grupo!: Grupo;
}
