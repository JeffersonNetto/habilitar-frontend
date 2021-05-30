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
import GrupoService from "../../services/GrupoService";
import useStyles from "./useStyles";
import validationSchema from "./validationSchema";
import initialValues from "./initialValues";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Grupo from "../../models/Grupo";
import { CustomResponse, ErrorResponse } from "../../helpers/Retorno";
import CustomTextField from "../../components/textfield/CustomTextField";

let stateGrupo: Grupo;

const GrupoForm = () => {
  const classes = useStyles();
  const { Insert, Update } = GrupoService();
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
      initialValues.UsuarioCriacaoId =
        usuarioLogado?.Id || localStorage.getItem("hbusr");
    });
  }, []);

  if (pathname.includes("editar")) {
    stateGrupo = state as Grupo;
    initialValues.Id = stateGrupo.Id;
    initialValues.Descricao = stateGrupo.Descricao;
  } else if (pathname.includes("criar")) {
    initialValues.Id = 0;
    initialValues.Descricao = "";
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
          const Func = pathname.includes("editar") ? Update : Insert;

          Func(values, initialValues.Id > 0 ? initialValues.Id : 0)
            .then((response: CustomResponse<Grupo>) => {
              setAlertMessage({
                severity: "success",
                mensagem: pathname.includes("editar")
                  ? "Grupo alterado com sucesso"
                  : "Grupo inserido com sucesso",
              });
              setOpen(true);
            })
            .catch((error: ErrorResponse) => {
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
                Grupo
              </Typography>
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField label="Descrição" name="Descricao" />
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

export default GrupoForm;
