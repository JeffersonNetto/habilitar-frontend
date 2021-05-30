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
import ExercicioService from "../../services/ExercicioService";
import useStyles from "./useStyles";
import validationSchema from "./validationSchema";
import initialValues from "./initialValues";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Exercicio from "../../models/Exercicio";
import { CustomResponse, ErrorResponse } from "../../helpers/Retorno";
import GrupoAutocomplete from "../../components/autocomplete/GrupoAutocomplete";
import CustomTextField from "../../components/textfield/CustomTextField";

let stateExercicio: Exercicio;

const ExercicioForm = () => {
  const classes = useStyles();
  const { Insert, Update } = ExercicioService();
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

  initialValues.Grupo = [];

  if (pathname.includes("editar")) {
    stateExercicio = state as Exercicio;

    initialValues.Id = stateExercicio.Id;
    initialValues.Descricao = stateExercicio.Descricao;
    initialValues.Nome = stateExercicio.Nome;
    initialValues.NomePopular = stateExercicio.NomePopular;
    initialValues.ExercicioGrupo = stateExercicio.ExercicioGrupo;

    stateExercicio.ExercicioGrupo?.forEach((eg) => {
      if (eg.Grupo && !initialValues.Grupo?.find((g) => g.Id === eg.GrupoId)) {
        initialValues.Grupo?.push(eg.Grupo);
      }
    });
  } else if (pathname.includes("criar")) {
    initialValues.Id = 0;
    initialValues.Descricao = "";
    initialValues.Nome = "";
    initialValues.NomePopular = "";
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
          values.ExercicioGrupo = [];

          values.Grupo?.forEach((g) => {
            values.ExercicioGrupo?.push({
              ExercicioId: values.Id,
              GrupoId: g.Id,
            });
          });

          const Func = pathname.includes("editar") ? Update : Insert;

          Func(values, initialValues.Id > 0 ? initialValues.Id : 0)
            .then((response: CustomResponse<Exercicio>) => {
              setAlertMessage({
                severity: "success",
                mensagem: pathname.includes("editar")
                  ? "Exercício alterado com sucesso"
                  : "Exercício inserido com sucesso",
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
                Exercício
              </Typography>
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField name="Descricao" label="Descrição" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField name="Nome" label="Nome" />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <CustomTextField name="NomePopular" label="Nome Popular" />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <GrupoAutocomplete formik={formik} />
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

export default ExercicioForm;
