import Entity from "./Entity";
import ExercicioGrupo from "./ExercicioGrupo";
import Grupo from "./Grupo";
export default interface Exercicio extends Entity {
  Nome: string;
  NomePopular?: string;
  Descricao?: string;
  Url?: string;
  Grupo?: Array<Grupo>;
  ExercicioGrupo?: Array<ExercicioGrupo>;
}
