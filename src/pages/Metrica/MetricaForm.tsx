import Button from "@material-ui/core/Button";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loader from "../../components/loader/Loader";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../context/AuthContext";
import GetIp from "../../services/IpService";
import MetricaService from "../../services/MetricaService";
import useStyles from "./useStyles";
import validationSchema from "./validationSchema";
import initialValues from "./initialValues";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Metrica from "../../models/Metrica";
import { CustomResponse, ErrorResponse } from "../../helpers/Retorno";
import CustomTextField from "../../components/textfield/CustomTextField";
import CustomSnackbar, {
  AlertMessage,
} from "../../components/snackbar/CustomSnackbar";

let stateMetrica: Metrica;

const MetricaForm = () => {
  const classes = useStyles();
  const { Insert, Update } = MetricaService();
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
    stateMetrica = state as Metrica;
    Object.assign(initialValues, stateMetrica);
  } else if (pathname.includes("criar")) {
    initialValues.Id = 0;
    initialValues.Descricao = "";
    initialValues.Observacao = "";
    initialValues.Sigla = "";
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log(values);

          const Func = pathname.includes("editar") ? Update : Insert;

          Func(values, initialValues.Id > 0 ? initialValues.Id : 0)
            .then((response: CustomResponse<Metrica>) => {
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
          <Container component="main" maxWidth="xl">
            <CssBaseline />

            <CustomSnackbar
              state={[open, setOpen]}
              alertMessage={alertMessage}
            />

            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Métrica
              </Typography>
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <CustomTextField name="Descricao" label="Descrição" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField name="Sigla" label="Sigla" />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <CustomTextField name="Observacao" label="Observação" />
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
            </div>
          </Container>
        )}
      </Formik>
    </div>
  );
};

export default MetricaForm;
