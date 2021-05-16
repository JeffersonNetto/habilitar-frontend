import Entity from "./Entity";

export default interface Empresa extends Entity {
  NomeFantasia: string;
  RazaoSocial: string;
  Cnpj: string;
}
