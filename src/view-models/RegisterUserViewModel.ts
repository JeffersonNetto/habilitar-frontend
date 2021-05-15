import PessoaViewModelInsert from "./PessoaViewModelInsert";

export default interface RegisterUserViewModel {
  Email: string;
  Password: string;
  ConfirmPassword: string;
  UserName: string;
  PhoneNumber: string;
  Pessoa: PessoaViewModelInsert;
}
