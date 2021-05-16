import Pessoa from "../models/Pessoa";
import ServiceBase from "./ServiceBase";

const url = "pessoa";

const PessoaService = () => {
  const { GetAll, Insert } = ServiceBase<Pessoa>(url);

  return { GetAll, Insert };
};

export default PessoaService;
