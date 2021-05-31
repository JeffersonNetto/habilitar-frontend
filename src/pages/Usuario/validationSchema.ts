import * as yup from "yup";

const validationSchema = yup.object({
  UserName: yup.string().required("Informe um nome de usuário"),
  PhoneNumber: yup.string().required("Informe um número de telefone"),
  Email: yup
    .string()
    .required("Informe seu e-mail")
    .email("Informe um e-mail válido"),
  Password: yup.string().required("Informe sua senha"),
  ConfirmPassword: yup.string().required("Confirme sua senha"),
  Nome: yup.string().required("Informe seu nome"),
  Sobrenome: yup.string().required("Informe seu sobrenome"),
  Cpf: yup.string().required("Informe seu CPF"),
  DataNascimento: yup.date().required("Informe sua data de nascimento"),
  Role: yup.string().required("Informe um perfil"),
});

export default validationSchema;
