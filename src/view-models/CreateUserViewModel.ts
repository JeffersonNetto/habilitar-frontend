export default interface CreateUserViewModel {
  Email: string;
  UserName: string;
  PhoneNumber: string;
  Cpf: string;
  DataNascimento: Date | undefined;
  Nome: string;
  Sobrenome: string;
  Sexo: string;
  IntegracaoId: string;
  Ip: string;
  Role: string;
  Id?: string;
}
