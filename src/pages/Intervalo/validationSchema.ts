import * as yup from "yup";

const validationSchema = yup.object({
  Descricao: yup.string().required("Informe uma descrição"),
});

export default validationSchema;
