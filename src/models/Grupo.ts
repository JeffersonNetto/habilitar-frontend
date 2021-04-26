import Entity from "./Entity";
import ExercicioGrupo from "./ExercicioGrupo";

export default class Grupo extends Entity {
  Descricao!: string;
  Observacao: string | undefined;
  ExercicioGrupo!: ExercicioGrupo[];
}
