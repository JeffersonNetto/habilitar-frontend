import Entity from "./Entity";
import ExercicioGrupo from "./ExercicioGrupo";

export default interface Grupo extends Entity {
  Id: number;
  Descricao: string;
  Observacao?: string;
  ExercicioGrupo?: ExercicioGrupo[];
}
