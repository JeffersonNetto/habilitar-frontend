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

let stateMetrica: Metrica;

const MetricaForm = () => {
  const classes = useStyles();
  const { Insert, Update } = MetricaService();
  const { usuarioLogado } = useContext(Context);
  const { pathname, state } = useLocation();
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<any>({
    severity: "",
    mensagem: "",
  });

  useEffect(() => {
    GetIp().then((response) => {
      initialValues.Ip = response;
    });
  }, []);

  if (pathname.includes("editar")) {
    stateMetrica = state as Metrica;
    initialValues.Id = stateMetrica.Id;
    initialValues.Descricao = stateMetrica.Descricao;
    initialValues.Observacao = stateMetrica.Observacao;
    initialValues.Sigla = stateMetrica.Sigla;
  } else if (pathname.includes("criar")) {
    initialValues.Id = 0;
    initialValues.Descricao = "";
    initialValues.Observacao = "";
    initialValues.Sigla = "";
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
                mensagem: pathname.includes("editar")
                  ? "Métrica alterada com sucesso"
                  : "Métrica inserida com sucesso",
              });
              setOpen(true);
            })
            .catch((error: ErrorResponse) => {
              console.log(error.Erros);
              setAlertMessage({
                severity: "error",
                mensagem: error
                  ? error.Erros.map((err) => <p>{err}</p>)
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

            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert
                onClose={handleClose}
                severity={alertMessage.severity}
                variant="filled"
              >
                <div style={{ fontSize: "1rem" }}>{alertMessage.mensagem}</div>
              </Alert>
            </Snackbar>

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
