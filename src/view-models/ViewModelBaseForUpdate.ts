import ViewModelBaseForInsert from "./ViewModelBaseForInsert";

export default interface ViewModelBaseForUpdate extends ViewModelBaseForInsert {
  Id: number;
  DataAtualizacao?: Date;
  UsuarioAtualizacaoId?: string;
}
