import Button from "@material-ui/core/Button";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loader from "../../components/loader/Loader";
import { useContext, useEffect, useState } from "react";
import GetIp from "../../services/IpService";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import useStyles from "./useStyles";
import validationSchema from "./validationSchema";
import initialValues from "./initialValues";
import CustomTextField from "../../components/textfield/CustomTextField";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ptBR from "date-fns/locale/pt-BR";
import DateFnsUtils from "@date-io/date-fns";
import UsuarioService from "../../services/UsuarioService";
import FormHelperText from "@material-ui/core/FormHelperText";
import CustomSnackbar, {
  AlertMessage,
} from "../../components/snackbar/CustomSnackbar";
import { ErrorResponse } from "../../helpers/Retorno";
import { Context } from "../../context/AuthContext";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function LimparInitialValues() {
  initialValues.Nome = "";
  initialValues.Sobrenome = "";
  initialValues.Email = "";
  initialValues.UserName = "";
  initialValues.PhoneNumber = "";
  initialValues.Nome = "";
  initialValues.Sobrenome = "";
  initialValues.DataNascimento = undefined;
  initialValues.Sexo = "";
  initialValues.IntegracaoId = "";
  initialValues.Cpf = "";
  initialValues.Role = "";
}

const UsuarioForm = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const { usuarioLogadoId } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessage>({
    severity: undefined,
    message: "",
  });

  useEffect(() => {
    GetIp().then((response) => {
      initialValues.Ip = response;
    });

    LimparInitialValues();

    (async () => {
      try {
        const response = await UsuarioService.Get(usuarioLogadoId);
        Object.assign(initialValues, response.Dados);
      } catch (error: any) {
        let err: ErrorResponse = error.response.data;
        setAlertMessage({
          severity: "error",
          message: err.Erros
            ? err.Erros.map((err: string) => (
                <>
                  {err}
                  <br />
                </>
              ))
            : "Sistema temporariamente indisponível",
        });
        setOpen(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [usuarioLogadoId]);

  return loading ? (
    <>
      <Box display="flex" justifyContent="center">
        <Loader loading={loading}></Loader>
      </Box>
    </>
  ) : (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
            await UsuarioService.Update(values as any, usuarioLogadoId);
            setAlertMessage({
              severity: "success",
              message: "Usuário alterado com sucesso",
            });
            setOpen(true);
          } catch (error: any) {
            let err: ErrorResponse = error.response.data;
            setAlertMessage({
              severity: "error",
              message: err.Erros
                ? err.Erros.map((err: string) => (
                    <>
                      {err}
                      <br />
                    </>
                  ))
                : "Sistema temporariamente indisponível",
            });
            setOpen(true);
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {(formik) => (
          <Container component="main" maxWidth="xl">
            <CssBaseline />

            <CustomSnackbar
              state={[open, setOpen]}
              alertMessage={alertMessage}
            />

            <div className={classes.paper}>
              <AccountCircleIcon color="inherit" />
              <Typography component="h1" variant="h5">
                Meu Perfil
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
                        value={formik.values.DataNascimento || null}
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
                    <CustomTextField
                      name="IntegracaoId"
                      label="Integração Id"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="select-label-sexo">Sexo</InputLabel>
                      <Select
                        labelId="select-label-sexo"
                        id="select-sexo"
                        value={formik.values.Sexo}
                        name="Sexo"
                        onChange={formik.handleChange}
                        placeholder="Sexo"
                        label="Sexo"
                        autoWidth
                      >
                        <MenuItem value="">
                          <em></em>
                        </MenuItem>
                        <MenuItem value="F">Feminino</MenuItem>
                        <MenuItem value="M">Masculino</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      error={formik.touched.Role && Boolean(formik.errors.Role)}
                    >
                      <InputLabel id="select-label-perfil">Perfil</InputLabel>
                      <Select
                        labelId="select-label-perfil"
                        id="select-perfil"
                        value={formik.values.Role}
                        name="Role"
                        onChange={formik.handleChange}
                        label="Perfil"
                        autoWidth
                        placeholder="Perfil"
                      >
                        <MenuItem value="">
                          <em></em>
                        </MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Auxiliar">Auxiliar</MenuItem>
                        <MenuItem value="Fisioterapeuta">
                          Fisioterapeuta
                        </MenuItem>
                        <MenuItem value="Paciente">Paciente</MenuItem>
                      </Select>
                      {formik.touched.Role && Boolean(formik.errors.Role) && (
                        <FormHelperText>{formik.errors.Role}</FormHelperText>
                      )}
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
