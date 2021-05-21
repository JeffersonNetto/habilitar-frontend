import Entity from "./Entity";
import ExercicioGrupo from "./ExercicioGrupo";

export default interface Grupo extends Entity {
  Descricao: string;
  Observacao?: string;
  ExercicioGrupo?: ExercicioGrupo[];
}
