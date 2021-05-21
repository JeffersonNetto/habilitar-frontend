import Unidade from "../../models/Unidade";

const initialValues: Unidade = {
  Nome: "",
  Email: "",
  Telefone: "",
  EmpresaId: 0,
  Ativo: true,
  Id: 0,
  Ip: "",
  Empresa: {
    Ativo: true,
    Cnpj: "",
    Id: 0,
    Ip: "",
    NomeFantasia: "",
    RazaoSocial: "",
  },
};

export default initialValues;
