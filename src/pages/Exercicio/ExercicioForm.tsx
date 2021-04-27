import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import * as yup from "yup";
import { useFormik } from "formik";
import { SuccessResponse, ErrorResponse } from "../../helpers/Retorno";
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
import Exercicio from "../../models/Exercicio";
import ExercicioService from "../../services/ExercicioService";

const validationSchema = yup.object({
  nome: yup.string().required("Informe o nome do exercício"),
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

let stateExercicio: Exercicio;

const ExercicioForm = () => {
  const classes = useStyles();
  const { Insert, Update } = ExercicioService();
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
    stateExercicio = state as Exercicio;
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
      nome: stateExercicio.Nome,
      nomePopular: stateExercicio.NomePopular,
      descricao: stateExercicio.Descricao,
      url: stateExercicio.Url,
    },
    onSubmit: (values) => {
      setLoading(true);
      const exercicio: Exercicio = {
        Nome: values.nome,
        NomePopular: values.nomePopular,
        Descricao: values.descricao,
        Ativo: true,
        DataCriacao: new Date(),
        Ip: ip,
        UsuarioCriacaoId: usuarioLogado?.Id,
        Id: stateExercicio.Id || 0,
        Url: values.url,
      };

      if (pathname.includes("editar")) {
        Update(exercicio.Id, exercicio)
          .then((response: SuccessResponse<Exercicio>) => {
            setAlertMessage({
              severity: "success",
              mensagem: response.Mensagem,
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
        Insert(exercicio)
          .then((response: SuccessResponse<Exercicio>) => {
            setAlertMessage({
              severity: "success",
              mensagem: response.Mensagem,
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
          Exercício
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="nome"
                name="nome"
                variant="outlined"
                fullWidth
                id="nome"
                label="Nome"
                autoFocus
                value={formik.values.nome}
                onChange={formik.handleChange}
                error={formik.touched.nome && Boolean(formik.errors.nome)}
                helperText={formik.touched.nome && formik.errors.nome}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="nomePopular"
                label="Nome Popular"
                name="nomePopular"
                autoComplete="nomePopular"
                value={formik.values.nomePopular}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="descricao"
                label="Descrição"
                name="descricao"
                autoComplete="descricao"
                value={formik.values.descricao}
                onChange={formik.handleChange}
                error={
                  formik.touched.descricao && Boolean(formik.errors.descricao)
                }
                helperText={formik.touched.descricao && formik.errors.descricao}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="url"
                label="Url"
                name="url"
                autoComplete="url"
                value={formik.values.url}
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

export default ExercicioForm;
