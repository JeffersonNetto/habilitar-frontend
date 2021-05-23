import Exercicio from "./Exercicio";
import Grupo from "./Grupo";

export default interface ExercicioGrupo {
  ExercicioId: number;
  GrupoId: number;
  Exercicio?: Exercicio;
  Grupo?: Grupo;
}
