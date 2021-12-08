import Button from "@material-ui/core/Button";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loader from "../../components/loader/Loader";
import { useContext, useState } from "react";
import useStyles from "./useStyles";
import CustomTextField from "../../components/textfield/CustomTextField";
import UsuarioService from "../../services/UsuarioService";
import CustomSnackbar, {
  AlertMessage,
} from "../../components/snackbar/CustomSnackbar";
import { ErrorResponse } from "../../helpers/Retorno";
import * as yup from "yup";
import { Context } from "../../context/AuthContext";
import AlterarSenhaViewModel from "../../view-models/AlterarSenhaViewModel";

const initialValues: AlterarSenhaViewModel = {
  SenhaAtual: "",
  NovaSenha: "",
  ConfirmarSenha: "",
};

const AlterarSenha = () => {
  const classes = useStyles();
  const { usuarioLogadoId } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessage>({
    severity: undefined,
    message: "",
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object({
          SenhaAtual: yup.string().required("Informe sua senha atual"),
          NovaSenha: yup.string().required("Informa a nova senha"),
          ConfirmarSenha: yup.string().required("Confirme a nova senha"),
        })}
        onSubmit={async (values, actions) => {
          try {
            await UsuarioService.AlterarSenha(values, usuarioLogadoId);
            setAlertMessage({
              severity: "success",
              message: "Senha alterada com sucesso",
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
              <Typography component="h1" variant="h5">
                Alterar senha
              </Typography>
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <CustomTextField
                      name="SenhaAtual"
                      label="Senha atual"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CustomTextField
                      name="NovaSenha"
                      label="Nova senha"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CustomTextField
                      name="ConfirmarSenha"
                      label="Confirmar senha"
                      type="password"
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

export default AlterarSenha;
