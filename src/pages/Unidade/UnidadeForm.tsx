import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Formik } from "formik";
import { ErrorResponse, CustomResponse } from "../../helpers/Retorno";
import Loader from "../../components/loader/Loader";
import { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useLocation } from "react-router";
import UnidadeService from "../../services/UnidadeService";
import Unidade from "../../models/Unidade";
import initialValues from "./initialValues";
import validationSchema from "./validationSchema";
import useStyles from "./useStyles";
import CustomTextField from "../../components/textfield/CustomTextField";
import EmpresaAutocomplete from "../../components/autocomplete/EmpresaAutocomplete";
import CustomSnackbar, {
  AlertMessage,
} from "../../components/snackbar/CustomSnackbar";
import HomeWorkRounded from "@material-ui/icons/HomeWorkRounded";

let stateUnidade: Unidade;

const UnidadeForm = () => {
  const classes = useStyles();
  const { Insert, Update } = UnidadeService();
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessage>({
    severity: undefined,
    message: "",
  });

  const { pathname, state } = useLocation();

  if (pathname.includes("editar")) {
    stateUnidade = state as Unidade;
    Object.assign(initialValues, stateUnidade);
  } else if (pathname.includes("criar")) {
    initialValues.Nome = "";
    initialValues.Telefone = "";
    initialValues.Email = "";
    initialValues.EmpresaId = 0;
    initialValues.Empresa = undefined;
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          values.Empresa = undefined;

          const Func = pathname.includes("editar") ? Update : Insert;

          Func(values, initialValues.Id > 0 ? initialValues.Id : 0)
            .then((response: CustomResponse<Unidade>) => {
              setAlertMessage({
                severity: "success",
                message: pathname.includes("editar")
                  ? "Unidade alterada com sucesso"
                  : "Unidade inserida com sucesso",
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
              <HomeWorkRounded color="inherit" />
              <Typography component="h1" variant="h5">
                Unidade
              </Typography>
              <form className={classes.form} onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField name="Nome" label="Nome" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField name="Email" label="E-mail" />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <CustomTextField name="Telefone" label="Telefone" />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <EmpresaAutocomplete formik={formik} />
                  </Grid>
                </Grid>
                <Box textAlign="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Salvar
                  </Button>
                </Box>
              </form>
            </div>
            <Box display="flex" justifyContent="center">
              <Loader loading={formik.isSubmitting}></Loader>
            </Box>
          </Container>
        )}
      </Formik>
    </div>
  );
};

export default UnidadeForm;
