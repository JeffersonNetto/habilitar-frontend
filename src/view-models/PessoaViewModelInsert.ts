import ViewModelBaseForInsert from "./ViewModelBaseForInsert";

export default interface PessoaViewModelInsert extends ViewModelBaseForInsert {
  Nome: string;
  Sobrenome: string;
  DataNascimento: Date | undefined;
  Sexo?: string;
  Cpf: string;
  IntegracaoId?: string;
}
