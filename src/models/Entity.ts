export default class Entity {
  Id: number = 0;
  Ip?: string;
  Ativo: boolean = true;
  DataCriacao: Date = new Date();
  UsuarioCriacaoId?: string;
  DataAtualizacao?: Date;
  UsuarioAtualizacaoId?: string;
}
