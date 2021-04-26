import Entity from "./Entity";
export default class Exercicio extends Entity {
  Nome!: string;
  NomePopular: string | undefined;
  Descricao!: string;
  Url!: string;
}
