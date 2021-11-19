import Button from "@material-ui/core/Button";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loader from "../../components/loader/Loader";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GetIp from "../../services/IpService";
import useStyles from "./useStyles";
import validationSchema from "./validationSchema";
import initialValues from "./initialValues";
import CustomTextField from "../../components/textfield/CustomTextField";
import UsuarioService from "../../services/UsuarioService";
import CreateUserViewModel from "../../view-models/CreateUserViewModel";
import CustomSnackbar, {
  AlertMessage,
} from "../../components/snackbar/CustomSnackbar";
import { ErrorResponse } from "../../helpers/Retorno";
import SupervisedUserCircleRounded from "@material-ui/icons/SupervisedUserCircleRounded";
import { Card, CardMedia } from "@material-ui/core";
import CustomDatePicker from "../../components/datepicker/CustomDatePicker";
import SimpleSelect from "../../components/select/SimpleSelect";

let stateUser: CreateUserViewModel;

function LimparInitialValues() {
  initialValues.Nome = "";
  initialValues.Sobrenome = "";
  initialValues.Email = "";
  initialValues.UserName = "";
  initialValues.PhoneNumber = "";
  initialValues.Nome = "";
  initialValues.Sobrenome = "";
  initialValues.DataNascimento = undefined as Date | undefined;
  initialValues.Sexo = "";
  initialValues.IntegracaoId = "";
  initialValues.Cpf = "";
  initialValues.Role = "";
}

const UsuarioForm = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const { pathname, state } = useLocation();
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

    if (pathname.includes("editar")) {
      stateUser = state as CreateUserViewModel;
      Object.assign(initialValues, {
        ...stateUser,
        DataNascimento: new Date(),
      });

      UsuarioService.ObterPerfil(initialValues.Id as string)
        .then((response) => {
          initialValues.Role = response;
        })
        .finally(() => setLoading(false));
    } else if (pathname.includes("criar")) {
      setLoading(false);
    }
  }, [pathname, state]);

  return loading ? (
    <>
      <Box display="flex" justifyContent="center">
        <Loader loading={loading}></Loader>
      </Box>
    </>
  ) : (
    <div>
      <Card
        variant="outlined"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <CardMedia
          image="/NEW_USER.png"
          style={{ minHeight: "20rem", minWidth: "34rem" }}
        ></CardMedia>
      </Card>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          const Func = pathname.includes("editar")
            ? UsuarioService.Update
            : UsuarioService.Insert;

          try {
            await Func(values as any, initialValues.Id);

            setAlertMessage({
              severity: "success",
              message: pathname.includes("editar")
                ? "Usuário alterado com sucesso"
                : "Usuário inserido com sucesso",
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
          <Card variant="outlined">
            <Container component="main" maxWidth="xl">
              <CssBaseline />

              <CustomSnackbar
                state={[open, setOpen]}
                alertMessage={alertMessage}
              />

              <div className={classes.paper}>
                <SupervisedUserCircleRounded color="inherit" />
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
                      <CustomDatePicker
                        label="Data de nascimento"
                        name="DataNascimento"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        name="UserName"
                        label="Nome de usuário"
                      />
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
                      <SimpleSelect
                        name="Sexo"
                        label="Sexo"
                        options={[
                          { Value: "F", Text: "Feminino" },
                          { Value: "M", Text: "Masculino" },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                      <SimpleSelect
                        label="Perfil"
                        name="Role"
                        options={[
                          { Value: "Admin", Text: "Admin" },
                          { Value: "Auxiliar", Text: "Auxiliar" },
                          { Value: "Fisioterapeuta", Text: "Fisioterapeuta" },
                          { Value: "Paciente", Text: "Paciente" },
                        ]}
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
          </Card>
        )}
      </Formik>
    </div>
  );
};

export default UsuarioForm;
