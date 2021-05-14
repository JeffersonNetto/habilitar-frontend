import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import * as yup from "yup";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
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

const validationSchema = yup.object({
  nome: yup.string().required("Informe seu nome"),
  sobrenome: yup.string().required("Informe seu sobrenome"),
  cpf: yup.string().required("Informe seu CPF"),
  dataNascimento: yup.string().required("Informe sua data de nascimento"),
  userName: yup.string().required("Informe um nome de usuário"),
  phoneNumber: yup.string().required("Informe um número de telefone"),
  email: yup
    .string()
    .required("Informe seu e-mail")
    .email("Informe um e-mail válido"),
  password: yup.string().required("Informe sua senha"),
  confirmPassword: yup.string().required("Confirme sua senha"),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    minWidth: 150,
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

const UsuarioForm = () => {
  const classes = useStyles();
  const { usuarioLogado } = useContext(Context);
  const [ip, SetIp] = useState("");
  const { pathname, state } = useLocation();

  useEffect(() => {
    GetIp().then((response) => {
      SetIp(response);
    });
  }, []);

  return (
    <div>
      <Formik
        initialValues={{
          nome: "",
          sobrenome: "",
          dataNascimento: undefined,
          sexo: "",
          cpf: "",
          integracaoId: "",
          userName: "",
          phoneNumber: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 500);
        }}
      >
        {(formik) => (
          <Container component="main" maxWidth="xl">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Usuário
              </Typography>
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="text"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.nome}
                      name="nome"
                      placeholder="Nome"
                      label="Nome"
                      error={formik.touched.nome && Boolean(formik.errors.nome)}
                      helperText={formik.touched.nome && formik.errors.nome}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="text"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.sobrenome}
                      name="sobrenome"
                      placeholder="Sobrenome"
                      label="Sobrenome"
                      error={
                        formik.touched.sobrenome &&
                        Boolean(formik.errors.sobrenome)
                      }
                      helperText={
                        formik.touched.sobrenome && formik.errors.sobrenome
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="text"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cpf}
                      name="cpf"
                      placeholder="CPF"
                      label="CPF"
                      error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                      helperText={formik.touched.cpf && formik.errors.cpf}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.dataNascimento}
                      name="dataNascimento"
                      placeholder="Data de nascimento"
                      label="Data de nascimento"
                      error={
                        formik.touched.dataNascimento &&
                        Boolean(formik.errors.dataNascimento)
                      }
                      helperText={
                        formik.touched.dataNascimento &&
                        formik.errors.dataNascimento
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="text"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.userName}
                      name="userName"
                      placeholder="Nome de usuário"
                      label="Nome de usuário"
                      error={
                        formik.touched.userName &&
                        Boolean(formik.errors.userName)
                      }
                      helperText={
                        formik.touched.userName && formik.errors.userName
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="text"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phoneNumber}
                      name="phoneNumber"
                      placeholder="Telefone"
                      label="Telefone"
                      error={
                        formik.touched.phoneNumber &&
                        Boolean(formik.errors.phoneNumber)
                      }
                      helperText={
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="text"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      name="email"
                      placeholder="E-mail"
                      label="E-mail"
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      name="password"
                      placeholder="Senha"
                      label="Senha"
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
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
                      value={formik.values.confirmPassword}
                      name="confirmPassword"
                      placeholder="Confirmar senha"
                      label="Confirmar senha"
                      error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                      }
                      helperText={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="text"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.integracaoId}
                      name="integracaoId"
                      placeholder="Integração Id"
                      label="Integração Id"
                      error={
                        formik.touched.integracaoId &&
                        Boolean(formik.errors.integracaoId)
                      }
                      helperText={
                        formik.touched.integracaoId &&
                        formik.errors.integracaoId
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="select-label">Sexo</InputLabel>
                      <Select
                        labelId="select-label"
                        id="select"
                        value={formik.values.sexo}
                        name="sexo"
                        onChange={formik.handleChange}
                        label="Sexo"
                        autoWidth
                      >
                        <MenuItem value="">
                          <em>Prefiro não informar</em>
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
