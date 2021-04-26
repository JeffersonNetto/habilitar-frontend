import Entity from "./Entity";

export default class Empresa extends Entity {
  NomeFantasia!: string;
  RazaoSocial!: string;
  Cnpj!: string;
}
