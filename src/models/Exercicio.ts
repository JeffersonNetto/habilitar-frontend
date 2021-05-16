import Entity from "./Entity";
export default interface Exercicio extends Entity {
  Nome: string;
  NomePopular?: string;
  Descricao?: string;
  Url?: string;
}
