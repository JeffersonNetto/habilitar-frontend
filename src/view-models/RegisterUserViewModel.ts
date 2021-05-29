export default interface RegisterUserViewModel {
  Email: string;
  Password: string;
  ConfirmPassword: string;
  UserName: string;
  PhoneNumber: string;
  Cpf: string;
  DataNascimento: Date | undefined;
  Nome: string;
  Sobrenome: string;
  Sexo: string;
  IntegracaoId: string;
  Ip: string;
}
