export default interface Entity {
  Ip: string;
  Ativo: boolean;
  DataCriacao?: Date;
  UsuarioCriacaoId?: string;
  DataAtualizacao?: Date;
  UsuarioAtualizacaoId?: string;
}
