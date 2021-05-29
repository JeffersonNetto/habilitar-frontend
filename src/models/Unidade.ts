import Empresa from "./Empresa";
import Entity from "./Entity";

export default interface Unidade extends Entity {
  Id: number;
  Nome: string;
  Email: string;
  Telefone: string;
  Cnes?: string;
  Latitude?: string;
  Longitude?: string;
  EmpresaId: number;
  Empresa?: Empresa;
}
