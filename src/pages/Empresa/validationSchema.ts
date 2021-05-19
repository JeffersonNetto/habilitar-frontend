import * as yup from "yup";

const validationSchema = yup.object({
  RazaoSocial: yup.string().required("Informe a Razão Social"),
  Cnpj: yup.string().required("Informe o CNPJ"),
});

export default validationSchema;
