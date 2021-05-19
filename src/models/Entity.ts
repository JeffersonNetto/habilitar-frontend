export default interface Entity {
  Id: number;
  Ip: string;
  Ativo: boolean;
  DataCriacao?: Date;
  UsuarioCriacaoId?: string;
  DataAtualizacao?: Date;
  UsuarioAtualizacaoId?: string;
}
