import * as yup from "yup";

const validationSchema = yup.object({
  UserName: yup.string().required("Informe um nome de usuário"),
  PhoneNumber: yup.string().required("Informe um número de telefone"),
  Email: yup
    .string()
    .required("Informe seu e-mail")
    .email("Informe um e-mail válido"),
  Nome: yup.string().required("Informe seu nome"),
  Sobrenome: yup.string().required("Informe seu sobrenome"),
  Cpf: yup.string().required("Informe seu CPF"),
  DataNascimento: yup
    .date()
    .required("Informe sua data de nascimento")
    .typeError("Informe uma data válida"),
  Role: yup.string().required("Informe um perfil"),
});

export default validationSchema;
