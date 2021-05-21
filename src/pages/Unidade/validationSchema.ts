import * as yup from "yup";

const validationSchema = yup.object({
  Nome: yup.string().required("Informe um nome"),
  Email: yup
    .string()
    .required("Informe um e-mail")
    .email("Informe um e-mail válido"),
  Telefone: yup.string().required("Informe um telefone"),
});

export default validationSchema;
