import Entity from "./Entity";

export default interface Empresa extends Entity {
  Id: number;
  NomeFantasia: string;
  RazaoSocial: string;
  Cnpj: string;
}
