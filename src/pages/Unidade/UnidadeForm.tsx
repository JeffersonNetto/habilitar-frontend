import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Formik } from "formik";
import { ErrorResponse, CustomResponse } from "../../helpers/Retorno";
import Loader from "../../components/loader/Loader";
import { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useLocation } from "react-router";
import UnidadeService from "../../services/UnidadeService";
import Unidade from "../../models/Unidade";
import EmpresaService from "../../services/EmpresaService";
import initialValues from "./initialValues";
import validationSchema from "./validationSchema";
import useStyles from "./useStyles";
import CustomTextField from "../../components/textfield/CustomTextField";
import EmpresaAutocomplete from "../../components/autocomplete/EmpresaAutocomplete";

let stateUnidade: Unidade;

const UnidadeForm = () => {
  const classes = useStyles();
  const { Insert, Update } = UnidadeService();
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<any>({
    severity: "",
    mensagem: "",
  });

  const { pathname, state } = useLocation();

  if (pathname.includes("editar")) {
    stateUnidade = state as Unidade;
    initialValues.Nome = stateUnidade.Nome;
    initialValues.Telefone = stateUnidade.Telefone;
    initialValues.Email = stateUnidade.Email;
    initialValues.EmpresaId = stateUnidade.EmpresaId;
    initialValues.Empresa = stateUnidade.Empresa;
  } else if (pathname.includes("criar")) {
    initialValues.Nome = "";
    initialValues.Telefone = "";
    initialValues.Email = "";
    initialValues.EmpresaId = 0;
    initialValues.Empresa = undefined;
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
          values.Empresa = undefined;

          const Func = pathname.includes("editar") ? Update : Insert;

          Func(values, initialValues.Id > 0 ? initialValues.Id : 0)
            .then((response: CustomResponse<Unidade>) => {
              console.log(response);
              setAlertMessage({
                severity: "success",
                mensagem: pathname.includes("editar")
                  ? "Unidade alterada com sucesso"
                  : "Unidade inserida com sucesso",
              });
              setOpen(true);
            })
            .catch((error: ErrorResponse) => {
              console.log(error.Erros);
              setAlertMessage({
                severity: "error",
                mensagem: error.Erros
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
