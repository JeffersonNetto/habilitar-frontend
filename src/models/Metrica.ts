import Entity from "./Entity";
export default interface Metrica extends Entity {
  Id: number;
  Descricao: string;
  Sigla?: string;
  Observacao?: string;
}
