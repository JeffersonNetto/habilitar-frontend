import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
import EmpresaService from "../../services/EmpresaService";
import useStyles from "./useStyles";
import validationSchema from "./validationSchema";
import initialValues from "./initialValues";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Empresa from "../../models/Empresa";
import { CustomResponse, ErrorResponse } from "../../helpers/Retorno";

let stateEmpresa: Empresa;

const EmpresaForm = () => {
  const classes = useStyles();
  const { Insert, Update } = EmpresaService();
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
    stateEmpresa = state as Empresa;
    initialValues.Id = stateEmpresa.Id;
    initialValues.NomeFantasia = stateEmpresa.NomeFantasia;
    initialValues.RazaoSocial = stateEmpresa.RazaoSocial;
    initialValues.Cnpj = stateEmpresa.Cnpj;
  } else if (pathname.includes("criar")) {
    initialValues.Id = 0;
    initialValues.NomeFantasia = "";
    initialValues.RazaoSocial = "";
    initialValues.Cnpj = "";
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
            .then((response: CustomResponse<Empresa>) => {
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
                Empresa
              </Typography>
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="text"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.NomeFantasia}
                      name="NomeFantasia"
                      placeholder="Nome Fantasia"
                      label="Nome Fantasia"
                      error={
                        formik.touched.NomeFantasia &&
                        Boolean(formik.errors.NomeFantasia)
                      }
                      helperText={
                        formik.touched.NomeFantasia &&
                        formik.errors.NomeFantasia
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="text"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.RazaoSocial}
                      name="RazaoSocial"
                      placeholder="Razão Social"
                      label="Razão Social"
                      error={
                        formik.touched.RazaoSocial &&
                        Boolean(formik.errors.RazaoSocial)
                      }
                      helperText={
                        formik.touched.RazaoSocial && formik.errors.RazaoSocial
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="text"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Cnpj}
                      name="Cnpj"
                      placeholder="CNPJ"
                      label="CNPJ"
                      error={formik.touched.Cnpj && Boolean(formik.errors.Cnpj)}
                      helperText={formik.touched.Cnpj && formik.errors.Cnpj}
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
            </div>
          </Container>
        )}
      </Formik>
    </div>
  );
};

export default EmpresaForm;
