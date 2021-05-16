import Entity from "./Entity";
export default interface Metrica extends Entity {
  Descricao: string;
  Sigla?: string;
  Observacao?: string;
}
