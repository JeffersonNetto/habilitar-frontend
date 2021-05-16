import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import * as yup from "yup";
import { useFormik } from "formik";
import { ErrorResponse, CustomResponse } from "../../helpers/Retorno";
import Loader from "../../components/loader/Loader";
import { useContext, useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import GetIp from "../../services/IpService";
import { Context } from "../../context/AuthContext";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useLocation } from "react-router";
import EmpresaService from "../../services/EmpresaService";
import Empresa from "../../models/Empresa";

const validationSchema = yup.object({
  razaoSocial: yup.string().required("Informe a Razão Social"),
  cnpj: yup.string().required("Informe o CNPJ"),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

let stateEmpresa: Empresa;

const EmpresaForm = () => {
  const classes = useStyles();
  const { Insert, Update } = EmpresaService();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<any>({
    severity: "",
    mensagem: "",
  });

  const { usuarioLogado } = useContext(Context);

  const [ip, SetIp] = useState("");
  const { pathname, state } = useLocation();

  if (pathname.includes("editar")) {
    stateEmpresa = state as Empresa;
  } else if (pathname.includes("criar")) {
  }

  useEffect(() => {
    GetIp().then((response) => {
      SetIp(response);
    });
  }, []);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      nomeFantasia: stateEmpresa.NomeFantasia,
      razaoSocial: stateEmpresa.RazaoSocial,
      cnpj: stateEmpresa.Cnpj,
    },
    onSubmit: (values) => {
      setLoading(true);
      const empresa: Empresa = {
        NomeFantasia: values.nomeFantasia,
        RazaoSocial: values.razaoSocial,
        Cnpj: values.cnpj,
        Ativo: true,
        DataCriacao: new Date(),
        Ip: ip,
        UsuarioCriacaoId: usuarioLogado?.Id,
        Id: stateEmpresa.Id || 0,
      };

      if (pathname.includes("editar")) {
        Update(empresa.Id, empresa)
          .then((response: CustomResponse<Empresa>) => {
            setAlertMessage({
              severity: "success",
              mensagem: "Empresa atualizada com sucesso",
            });
            setOpen(true);
          })
          .catch((error: ErrorResponse) => {
            setAlertMessage({
              severity: "error",
              mensagem: error
                ? error.Mensagem
                : "Sistema temporariamente indisponível",
            });
            setOpen(true);
          })
          .finally(() => {
            setLoading(false);
          });
      }

      if (pathname.includes("criar")) {
        Insert(empresa)
          .then((response: CustomResponse<Empresa>) => {
            setAlertMessage({
              severity: "success",
              mensagem: "Empresa inserida com sucesso",
            });
            setOpen(true);
          })
          .catch((error: ErrorResponse) => {
            setAlertMessage({
              severity: "error",
              mensagem: error
                ? error.Mensagem
                : "Sistema temporariamente indisponível",
            });
            setOpen(true);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    validationSchema: validationSchema,
  });

  return (
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
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="nomeFantasia"
                name="nomeFantasia"
                variant="outlined"
                fullWidth
                id="nomeFantasia"
                label="Nome Fantasia"
                value={formik.values.nomeFantasia}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="razaoSocial"
                name="razaoSocial"
                variant="outlined"
                fullWidth
                id="razaoSocial"
                label="Razão Social"
                value={formik.values.razaoSocial}
                onChange={formik.handleChange}
                error={
                  formik.touched.razaoSocial &&
                  Boolean(formik.errors.razaoSocial)
                }
                helperText={
                  formik.touched.razaoSocial && formik.errors.razaoSocial
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="cnpj"
                name="cnpj"
                variant="outlined"
                fullWidth
                id="cnpj"
                label="CNPJ"
                value={formik.values.cnpj}
                onChange={formik.handleChange}
                error={formik.touched.cnpj && Boolean(formik.errors.cnpj)}
                helperText={formik.touched.cnpj && formik.errors.cnpj}
              />
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
        <Loader loading={loading}></Loader>
      </Box>
    </Container>
  );
};

export default EmpresaForm;
