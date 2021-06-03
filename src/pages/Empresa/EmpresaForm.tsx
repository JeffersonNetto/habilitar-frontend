import Button from "@material-ui/core/Button";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loader from "../../components/loader/Loader";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GetIp from "../../services/IpService";
import EmpresaService from "../../services/EmpresaService";
import useStyles from "./useStyles";
import validationSchema from "./validationSchema";
import initialValues from "./initialValues";
import Empresa from "../../models/Empresa";
import { CustomResponse, ErrorResponse } from "../../helpers/Retorno";
import CustomTextField from "../../components/textfield/CustomTextField";
import CustomSnackbar, {
  AlertMessage,
} from "../../components/snackbar/CustomSnackbar";
import BusinessRounded from "@material-ui/icons/BusinessRounded";
import { Card, CardMedia } from "@material-ui/core";

let stateEmpresa: Empresa;

const EmpresaForm = () => {
  const classes = useStyles();
  const { Insert, Update } = EmpresaService();
  const { pathname, state } = useLocation();
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessage>({
    severity: undefined,
    message: "",
  });

  useEffect(() => {
    GetIp().then((response) => {
      initialValues.Ip = response;
    });
  }, []);

  if (pathname.includes("editar")) {
    stateEmpresa = state as Empresa;

    Object.assign(initialValues, stateEmpresa);
  } else if (pathname.includes("criar")) {
    initialValues.Id = 0;
    initialValues.NomeFantasia = "";
    initialValues.RazaoSocial = "";
    initialValues.Cnpj = "";
  }

  return (
    <div>
      <Card
        variant="outlined"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <CardMedia
          image="/EMPRESA.png"
          style={{ minHeight: "20rem", minWidth: "50rem" }}
        ></CardMedia>
      </Card>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          const Func = pathname.includes("editar") ? Update : Insert;

          Func(values, initialValues.Id > 0 ? initialValues.Id : 0)
            .then((response: CustomResponse<Empresa>) => {
              console.log(response);
              setAlertMessage({
                severity: "success",
                message: pathname.includes("editar")
                  ? "Métrica alterada com sucesso"
                  : "Métrica inserida com sucesso",
              });
              setOpen(true);
            })
            .catch((error: any) => {
              let err: ErrorResponse = error.response.data;
              setAlertMessage({
                severity: "error",
                message: err.Erros
                  ? err.Erros.map((err: string) => (
                      <>
                        {err}
                        <br />
                      </>
                    ))
                  : "Sistema temporariamente indisponível",
              });
              setOpen(true);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {(formik) => (
          <Card variant="outlined">
            <Container component="main" maxWidth="xl">
              <CssBaseline />
              <CustomSnackbar
                alertMessage={alertMessage}
                state={[open, setOpen]}
              />
              <div className={classes.paper}>
                <BusinessRounded color="inherit" />
                <Typography component="h1" variant="h5">
                  Empresa
                </Typography>
                <Form className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        name="NomeFantasia"
                        label="Nome Fantasia"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        name="RazaoSocial"
                        label="Razão Social"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <CustomTextField name="Cnpj" label="CNPJ" />
                    </Grid>
                  </Grid>
                  <Box textAlign="center">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={formik.isSubmitting}
                      className={classes.submit}
                    >
                      Salvar
                    </Button>
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <Loader loading={formik.isSubmitting}></Loader>
                  </Box>
                </Form>
              </div>{" "}
            </Container>
          </Card>
        )}
      </Formik>
    </div>
  );
};

export default EmpresaForm;
