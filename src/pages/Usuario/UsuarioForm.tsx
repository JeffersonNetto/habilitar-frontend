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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AuthService from "../../services/AuthService";
import useStyles from "./useStyles";
import validationSchema from "./validationSchema";
import initialValues from "./initialValues";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Pessoa from "../../models/Pessoa";
import { format } from "date-fns";
import CustomTextField from "../../components/textfield/CustomTextField";

let statePessoa: Pessoa;

const UsuarioForm = () => {
  const classes = useStyles();
  const { usuarioLogado } = useContext(Context);
  const { pathname, state } = useLocation();
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<any>({
    severity: "",
    mensagem: "",
  });

  useEffect(() => {
    GetIp().then((response) => {
      initialValues.Pessoa.Ip = response;
      initialValues.Pessoa.UsuarioCriacaoId =
        usuarioLogado?.Id || localStorage.getItem("hbusr");
    });
  }, []);

  if (pathname.includes("editar")) {
    statePessoa = state as Pessoa;

    initialValues.Email = statePessoa.User.Email;
    initialValues.UserName = statePessoa.User.UserName;
    initialValues.PhoneNumber = statePessoa.User.PhoneNumber;
    initialValues.Pessoa.Nome = statePessoa.Nome;
    initialValues.Pessoa.Sobrenome = statePessoa.Sobrenome;
    initialValues.Pessoa.DataNascimento = format(
      new Date(statePessoa.DataNascimento),
      "yyyy-MM-dd"
    );
    initialValues.Pessoa.Sexo = statePessoa.Sexo || "NI";
    initialValues.Pessoa.IntegracaoId = statePessoa.IntegracaoId || "";
    initialValues.Pessoa.Cpf = statePessoa.Cpf;
  } else if (pathname.includes("criar")) {
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

          // actions.setSubmitting(true);

          AuthService.Registrar(values)
            .then((response) => {
              console.log(response);
              setAlertMessage({
                severity: "success",
                mensagem: "Usuário registrado com sucesso",
              });
              setOpen(true);
            })
            .catch((error) => {
              console.log(error);
              setAlertMessage({
                severity: "error",
                mensagem: error
                  ? error.Mensagem
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
                Usuário
              </Typography>
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField name="Pessoa.Nome" label="Nome" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      name="Pessoa.Sobrenome"
                      label="Sobrenome"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField name="Pessoa.Cpf" label="CPF" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Pessoa?.DataNascimento}
                      name="Pessoa.DataNascimento"
                      placeholder="Data de nascimento"
                      label="Data de nascimento"
                      error={
                        formik.touched.Pessoa?.DataNascimento &&
                        Boolean(formik.errors.Pessoa?.DataNascimento)
                      }
                      helperText={
                        formik.touched.Pessoa?.DataNascimento &&
                        formik.errors.Pessoa?.DataNascimento
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField name="UserName" label="Nome de usuário" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField name="PhoneNumber" label="Telefone" />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <CustomTextField name="Email" label="E-mail" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Password}
                      name="Password"
                      placeholder="Senha"
                      label="Senha"
                      error={
                        formik.touched.Password &&
                        Boolean(formik.errors.Password)
                      }
                      helperText={
                        formik.touched.Password && formik.errors.Password
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.ConfirmPassword}
                      name="ConfirmPassword"
                      placeholder="Confirmar senha"
                      label="Confirmar senha"
                      error={
                        formik.touched.ConfirmPassword &&
                        Boolean(formik.errors.ConfirmPassword)
                      }
                      helperText={
                        formik.touched.ConfirmPassword &&
                        formik.errors.ConfirmPassword
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      name="Pessoa.IntegracaoId"
                      label="Integração Id"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="select-label">Sexo</InputLabel>
                      <Select
                        labelId="select-label"
                        id="select"
                        value={formik.values.Pessoa.Sexo}
                        name="Pessoa.Sexo"
                        onChange={formik.handleChange}
                        label="Sexo"
                        autoWidth
                      >
                        <MenuItem value="NI">
                          <em></em>
                        </MenuItem>
                        <MenuItem value="F">Feminino</MenuItem>
                        <MenuItem value="M">Masculino</MenuItem>
                      </Select>
                    </FormControl>
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

export default UsuarioForm;
