import RegisterUserViewModel from "../../view-models/RegisterUserViewModel";

const initialValues: RegisterUserViewModel = {
  ConfirmPassword: "",
  Password: "",
  Email: "",
  PhoneNumber: "",
  UserName: "",
  Pessoa: {
    Cpf: "",
    DataNascimento: undefined,
    Nome: "",
    Sobrenome: "",
    Sexo: "NI",
    IntegracaoId: "",
    Ip: "",
    UsuarioCriacaoId: "",
  },
};

export default initialValues;
