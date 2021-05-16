export default interface PessoaViewModelUpdate {
  Nome: string;
  Sobrenome: string;
  DataNascimento: Date;
  DataNascimentoStr: string;
  Sexo?: string;
  Cpf: string;
  IntegracaoId?: string;
  UserId?: string;
}
