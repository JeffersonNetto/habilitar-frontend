import RegisterUserViewModel from "../../view-models/RegisterUserViewModel";

const initialValues: RegisterUserViewModel = {
  Password: "",
  ConfirmPassword: "",
  Email: "",
  PhoneNumber: "",
  UserName: "",
  Cpf: "",
  DataNascimento: undefined,
  Nome: "",
  Sobrenome: "",
  Sexo: "NI",
  IntegracaoId: "",
  Ip: "",
  Role: "",
};

export default initialValues;
