import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import * as yup from "yup";
import { useFormik } from "formik";
import { SuccessResponse, ErrorResponse } from "../../helpers/Retorno";
import Loader from "../../components/loader/Loader";
import { useContext, useEffect, useState } from "react";
import Usuario from "../../models/Usuario";
import UsuarioService from "../../services/UsuarioService";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Autocomplete from "@material-ui/lab/Autocomplete";
import GetIp from "../../services/IpService";
import { Pessoa } from "../../models/Pessoa";
import { Context } from "../../context/AuthContext";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useLocation } from "react-router";

const validationSchema = yup.object({
  login: yup.string().required("Informe seu login"),
  senha: yup.string().required("Informe sua senha"),
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

let usuario: Usuario;
const pessoas: Pessoa[] = [];

const UsuarioForm = () => {
  const classes = useStyles();
  const { Insert } = UsuarioService();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<any>({
    severity: "",
    mensagem: "",
  });

  const { usuarioLogado } = useContext(Context);

  const [ip, SetIp] = useState("");
  const [pessoa, SetPessoa] = useState<Pessoa | null>(null);

  const { pathname, state } = useLocation();

  if (pathname.includes("editar")) {
    usuario = state as Usuario;
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
      login: usuario.Login,
      senha: "",
      conselho: usuario.Conselho,
    },
    onSubmit: (values) => {
      setLoading(true);
      const usuario: Usuario = {
        Login: values.login,
        Senha: values.senha,
        Ativo: true,
        DataCriacao: new Date(),
        Ip: ip,
        Profissional: false,
        Fisioterapeuta: false,
        UsuarioCriacaoId: usuarioLogado?.Id,
        Id: 0,
        PessoaId: pessoa?.Id,
        Conselho: values.conselho,
      };

      console.log("form", usuario);

      Insert(usuario)
        .then((response: SuccessResponse<Usuario>) => {
          setAlertMessage({ severity: "success", mensagem: response.Mensagem });
          setOpen(true);
        })
        .catch((error: any) => {
          let err: ErrorResponse = error?.response?.data;
          setAlertMessage({
            severity: "error",
            mensagem: err
              ? err.Mensagem
              : "Sistema temporariamente indisponível",
          });
          setOpen(true);
        })
        .finally(() => {
          setLoading(false);
        });
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
          Usuário
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="login"
                name="login"
                variant="outlined"
                fullWidth
                id="login"
                label="Login"
                autoFocus
                value={formik.values.login}
                onChange={formik.handleChange}
                error={formik.touched.login && Boolean(formik.errors.login)}
                helperText={formik.touched.login && formik.errors.login}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="password"
                variant="outlined"
                fullWidth
                id="senha"
                label="Senha"
                name="senha"
                autoComplete="senha"
                value={formik.values.senha}
                onChange={formik.handleChange}
                error={formik.touched.senha && Boolean(formik.errors.senha)}
                helperText={formik.touched.senha && formik.errors.senha}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="conselho"
                label="Conselho"
                name="conselho"
                autoComplete="conselho"
                value={formik.values.conselho}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                id="pessoa"
                value={pessoa}
                onChange={(event: any, newValue: Pessoa | null) => {
                  SetPessoa(newValue);
                }}
                options={pessoas}
                getOptionSelected={(option, value) => option?.Id === value?.Id}
                getOptionLabel={(pessoa) => pessoa.Nome}
                renderInput={(params) => (
                  <TextField {...params} label="Pessoa" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox value="profissional" color="primary" />}
                label="Profissional"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox value="fisioterapeuta" color="primary" />}
                label="Fisioterapeuta"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Salvar
          </Button>
        </form>
      </div>
      <Box display="flex" justifyContent="center">
        <Loader loading={loading}></Loader>
      </Box>
    </Container>
  );
};

export default UsuarioForm;
