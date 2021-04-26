import Entity from "./Entity";
export class Pessoa extends Entity {
  Nome!: string;
  Sobrenome!: string;
  DataNascimento!: Date;
  Sexo!: string;
  Cpf!: string;
  Telefone!: string;
  IntegracaoId: string | undefined;
  Email!: string;
}
