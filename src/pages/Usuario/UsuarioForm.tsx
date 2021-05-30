import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Formik, Form, Field } from "formik";
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
import CustomTextField from "../../components/textfield/CustomTextField";
import User from "../../models/User";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ptBR from "date-fns/locale/pt-BR";
import Utils from "@date-io/date-fns";
import DatePicker from "material-ui-pickers/DatePicker";
import DateFnsUtils from "@date-io/date-fns";
import UsuarioService from "../../services/UsuarioService";
import RegisterUserViewModel from "../../view-models/RegisterUserViewModel";
import { ErrorResponse } from "../../helpers/Retorno";

let stateUser: User;

const UsuarioForm = () => {
  const classes = useStyles();
  const { Insert, Update } = UsuarioService();
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

  if (pathname.includes("editar")) {
    stateUser = state as User;

    initialValues.Nome = stateUser.Nome;
    initialValues.Sobrenome = stateUser.Sobrenome;
    initialValues.Email = stateUser.Email;
    initialValues.UserName = stateUser.UserName;
    initialValues.PhoneNumber = stateUser.PhoneNumber;
    initialValues.Nome = stateUser.Nome;
    initialValues.Sobrenome = stateUser.Sobrenome;
    // initialValues.DataNascimento = format(
    //   new Date(stateUser.DataNascimento),
    //   "yyyy-MM-dd"
    // );
    initialValues.DataNascimento = stateUser.DataNascimento;
    initialValues.Sexo = stateUser.Sexo || "NI";
    initialValues.IntegracaoId = stateUser.IntegracaoId || "";
    initialValues.Cpf = stateUser.Cpf;
  } else if (pathname.includes("criar")) {
    initialValues.Nome = "";
    initialValues.Sobrenome = "";
    initialValues.Email = "";
    initialValues.UserName = "";
    initialValues.PhoneNumber = "";
    initialValues.Nome = "";
    initialValues.Sobrenome = "";
    initialValues.DataNascimento = undefined;
    initialValues.Sexo = "NI";
    initialValues.IntegracaoId = "";
    initialValues.Cpf = "";
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

          Func(values as any)
            .then((response: any) => {
              setAlertMessage({
                severity: "success",
                mensagem: pathname.includes("editar")
                  ? "Usuário alterado com sucesso"
                  : "Usuário inserido com sucesso",
              });
              setOpen(true);
            })
            .catch((error: any) => {
              let err = error.response.data;
              setAlertMessage({
                severity: "error",
                mensagem: err.Erros
                  ? err.Erros.map((err: string) => (
                      <>
                        {err}
                        <br />
                      </>
                    ))
                  : "Sistema temporariamente indisponível",
              });
              setOpen(true);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });

          AuthService.Registrar(values)
            .then((response) => {
              setAlertMessage({
                severity: "success",
                mensagem: "Usuário registrado com sucesso",
              });
              setOpen(true);
            })
            .catch((error) => {
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
                    <CustomTextField name="Nome" label="Nome" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField name="Sobrenome" label="Sobrenome" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField name="Cpf" label="CPF" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        fullWidth
                        autoOk
                        invalidDateMessage="A data informada é inválida"
                        variant="inline"
                        margin="none"
                        name="DataNascimento"
                        label="Data de nascimento"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        value={formik.values.DataNascimento}
                        onChange={(value) =>
                          formik.setFieldValue("DataNascimento", value)
                        }
                      />
                    </MuiPickersUtilsProvider>
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
                      name="IntegracaoId"
                      label="Integração Id"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="select-label">Sexo</InputLabel>
                      <Select
                        labelId="select-label"
                        id="select"
                        value={formik.values.Sexo}
                        name="Sexo"
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
