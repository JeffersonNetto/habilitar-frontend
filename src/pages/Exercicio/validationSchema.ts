import * as yup from "yup";

const validationSchema = yup.object({
  Descricao: yup.string().required("Informe uma descrição"),
  Nome: yup.string().required("Informe um nome"),
});

export default validationSchema;
