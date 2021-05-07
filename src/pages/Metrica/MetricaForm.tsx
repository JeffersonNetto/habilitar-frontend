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
import MetricaService from "../../services/MetricaService";
import Metrica from "../../models/Metrica";

const validationSchema = yup.object({
  descricao: yup.string().required("Informe uma descrição"),
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

let stateMetrica: Metrica;

const MetricaForm = () => {
  const classes = useStyles();
  const { Insert, Update } = MetricaService();
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
    stateMetrica = state as Metrica;
  } else if (pathname.includes("criar")) {
    stateMetrica = new Metrica();
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
      descricao: stateMetrica.Descricao,
      observacao: stateMetrica.Observacao,
      sigla: stateMetrica.Sigla,
    },
    onSubmit: (values) => {
      setLoading(true);
      const metrica: Metrica = {
        Descricao: values.descricao,
        Ativo: true,
        DataCriacao: new Date(),
        Ip: ip,
        UsuarioCriacaoId: usuarioLogado?.Id,
        Id: stateMetrica.Id || 0,
        Sigla: values.sigla,
        Observacao: values.observacao,
      };

      if (pathname.includes("editar")) {
        Update(metrica.Id, metrica)
          .then((response: CustomResponse<Metrica>) => {
            setAlertMessage({
              severity: "success",
              mensagem: "Métrica atualizada com sucesso",
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
        Insert(metrica)
          .then((response: CustomResponse<Metrica>) => {
            setAlertMessage({
              severity: "success",
              mensagem: "Métrica inserida com sucesso",
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
          Métrica
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="descricao"
                name="descricao"
                variant="outlined"
                fullWidth
                id="descricao"
                label="Descrição"
                value={formik.values.descricao}
                onChange={formik.handleChange}
                error={
                  formik.touched.descricao && Boolean(formik.errors.descricao)
                }
                helperText={formik.touched.descricao && formik.errors.descricao}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="sigla"
                label="Sigla"
                name="sigla"
                autoComplete="sigla"
                value={formik.values.sigla}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="observacao"
                label="Observação"
                name="observacao"
                autoComplete="observacao"
                value={formik.values.observacao}
                onChange={formik.handleChange}
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

export default MetricaForm;
