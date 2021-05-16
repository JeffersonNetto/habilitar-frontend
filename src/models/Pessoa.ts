import Entity from "./Entity";
import User from "./User";

export default interface Pessoa extends Entity {
  Nome: string;
  Sobrenome: string;
  DataNascimento: string;
  Sexo: string;
  Cpf: string;
  IntegracaoId?: string;
  User: User;
}
