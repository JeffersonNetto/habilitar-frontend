import Entity from "./Entity";
export default class Usuario extends Entity {
  Login!: string;
  Senha!: string;
  PessoaId?: number;
  UnidadeId?: number;
  Profissional!: boolean;
  Fisioterapeuta!: boolean;
  Conselho: string | undefined;
  Token?: string;
}
