export default class Entity {
  Id: number = 0;
  Ip?: string;
  Ativo: boolean = true;
  DataCriacao: Date = new Date();
  UsuarioCriacaoId?: number;
  DataAtualizacao?: Date;
  UsuarioAtualizacaoId?: number;
}
