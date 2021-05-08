import Empresa from "./Empresa";
import Entity from "./Entity";

export default class Unidade extends Entity {
  Nome!: string;
  Email!: string;
  Telefone!: string;
  Cnes: string | undefined;
  Latitude: string | undefined;
  Longitude: string | undefined;
  EmpresaId!: number;
  Empresa?: Empresa;
}
