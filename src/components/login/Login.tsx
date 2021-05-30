import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "./useStyles";
import { useState, useContext, useEffect } from "react";
import { Snackbar } from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { Context } from "../../context/AuthContext";
import Loader from "../loader/Loader";
import { useHistory } from "react-router";
import LoginViewModel from "../../view-models/LoginViewModel";
import LoginResponseViewModel from "../../view-models/LoginResponseViewModel";
import { ErrorResponse } from "../../helpers/Retorno";

const validationSchema = yup.object({
  email: yup.string().required("Informe seu e-mail"),
  password: yup.string().required("Informe sua senha"),
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Habilitar
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  const { handleLogin } = useContext(Context);
  const history = useHistory();

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<any>({
    severity: "",
    mensagem: "",
  });

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      const usuario: LoginViewModel = {
        Email: values.email,
        Password: values.password,
      };

      handleLogin(usuario)
        .then((response: LoginResponseViewModel) => {
          setAlertMessage({
            severity: "success",
            mensagem: "Login realizado com sucesso",
          });
          setOpen(true);
          setTimeout(() => {
            history.push("/");
          }, 1000);
        })
        .catch((error: any) => {
          let err: ErrorResponse = error?.response?.data;
          setAlertMessage({
            severity: "error",
            mensagem: err.Erros
              ? err.Erros.map((err) => err)
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
    <Grid container component="main" className={classes.root}>
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

      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src="/LOGO_TARJA_A_AZUL.png" height="128" alt="logo" />
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar de mim"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
            </Button>
            <Box display="flex" justifyContent="center">
              <Loader loading={loading}></Loader>
            </Box>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueci minha senha
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
