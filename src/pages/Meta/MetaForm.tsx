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
import MetaService from "../../services/MetaService";
import useStyles from "./useStyles";
import validationSchema from "./validationSchema";
import initialValues from "./initialValues";
import Meta from "../../models/Meta";
import { CustomResponse, ErrorResponse } from "../../helpers/Retorno";
import CustomTextField from "../../components/textfield/CustomTextField";
import CustomSnackbar, {
  AlertMessage,
} from "../../components/snackbar/CustomSnackbar";
import BusinessRounded from "@material-ui/icons/BusinessRounded";
import { Card, CardMedia } from "@material-ui/core";
import ExercicioSelect from "../../components/select/ExercicioSelect";
import IntervaloSelect from "../../components/select/IntervaloSelect";
import MetricaSelect from "../../components/select/MetricaSelect";
import UsuarioSelect from "../../components/select/UsuarioSelect";
import { TipoUsuario } from "../../view-models/TipoUsuario";

let stateEmpresa: Meta;

const MetaForm = () => {
  const classes = useStyles();
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
    stateEmpresa = state as Meta;

    Object.assign(initialValues, stateEmpresa);
  } else if (pathname.includes("criar")) {
    initialValues.Id = 0;
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
          const Func = pathname.includes("editar")
            ? MetaService.Update
            : MetaService.Insert;

          Func(values, initialValues.Id > 0 ? initialValues.Id : 0)
            .then((response: CustomResponse<Meta>) => {
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
                  Meta
                </Typography>
                <Form className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField name="QtdSeries" label="QtdSeries" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField name="MetricaQtd" label="MetricaQtd" />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <ExercicioSelect />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <IntervaloSelect />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <MetricaSelect />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <UsuarioSelect
                        label="Fisioterapeuta"
                        name="FisioterapeutaId"
                        tipoUsuario={TipoUsuario.FISIOTERAPEUTA}
                      />
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

export default MetaForm;
