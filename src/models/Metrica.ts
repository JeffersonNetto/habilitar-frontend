import Entity from "./Entity";
export default class Metrica extends Entity {
  Descricao!: string;
  Sigla: string | undefined;
  Observacao: string | undefined;
}
