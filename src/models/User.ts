import Entity from "./Entity";

export default interface User extends Entity {
  Id: string;
  UserName: string;
  Email: string;
  PhoneNumber: string;
  DataNascimento: Date | undefined;
  Sexo?: string;
  IntegracaoId?: string;
  Cpf: string;
  Nome: string;
  Sobrenome: string;
  PasswordHash: string;
}
