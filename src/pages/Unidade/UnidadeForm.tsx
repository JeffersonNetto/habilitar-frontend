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
import UnidadeService from "../../services/UnidadeService";
import Unidade from "../../models/Unidade";
import Autocomplete from "@material-ui/lab/Autocomplete";
import EmpresaService from "../../services/EmpresaService";
import ComboBase from "../../view-models/ComboBase";
import { AutoCompleteEmpresa } from "../../components/autocomplete/autocomplete-empresa";

const validationSchema = yup.object({
  nome: yup.string().required("Informe um nome"),
  email: yup
    .string()
    .required("Informe um e-mail")
    .email("Informe um e-mail válido"),
  telefone: yup.string().required("Informe um telefone"),
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

let stateUnidade: Unidade;

const UnidadeForm = () => {
  const classes = useStyles();
  const { Insert, Update } = UnidadeService();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<any>({
    severity: "",
    mensagem: "",
  });

  const [empresas, setEmpresas] = useState<ComboBase<number>[]>([]);
  const [empresa, setEmpresa] = useState<ComboBase<number> | null>(null);
  const { usuarioLogado } = useContext(Context);
  const [ip, SetIp] = useState("");
  const { pathname, state } = useLocation();

  if (pathname.includes("editar")) {
    stateUnidade = state as Unidade;
  } else if (pathname.includes("criar")) {
    stateUnidade = new Unidade();
  }

  useEffect(() => {
    if (empresas.length > 0) {
      let temp = empresas.find((e) => e.Value === stateUnidade.EmpresaId);

      if (temp) {
        setEmpresa(temp);
      }
    }
  }, [empresas]);

  useEffect(() => {
    GetIp().then((response) => {
      SetIp(response);
    });

    EmpresaService()
      .GetCombo()
      .then((response: CustomResponse<ComboBase<number>[]>) => {
        setEmpresas(response.Dados);
      })
      .catch((err) => {
        console.log(err);
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
      nome: stateUnidade.Nome,
      email: stateUnidade.Email,
      telefone: stateUnidade.Telefone,
      empresaId: stateUnidade.EmpresaId,
    },
    onSubmit: (values) => {
      console.log(values);

      setLoading(true);

      const unidade: Unidade = {
        Nome: values.nome,
        Email: values.email,
        Telefone: values.telefone,
        Ativo: true,
        DataCriacao: new Date(),
        Ip: ip,
        UsuarioCriacaoId: usuarioLogado?.Id,
        Id: stateUnidade.Id || 0,
        Cnes: "",
        Latitude: "",
        Longitude: "",
        EmpresaId: empresa?.Value || 0,
      };

      console.log(unidade);

      if (pathname.includes("editar")) {
        Update(unidade.Id, unidade)
          .then((response: CustomResponse<Unidade>) => {
            setAlertMessage({
              severity: "success",
              mensagem: "Unidade atualizada com sucesso",
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
        Insert(unidade)
          .then((response: CustomResponse<Unidade>) => {
            setAlertMessage({
              severity: "success",
              mensagem: "Unidade inserida com sucesso",
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
          Unidade
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
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="telefone"
                name="telefone"
                label="Telefone"
                autoComplete="telefone"
                value={formik.values.telefone}
                onChange={formik.handleChange}
                error={
                  formik.touched.telefone && Boolean(formik.errors.telefone)
                }
                helperText={formik.touched.telefone && formik.errors.telefone}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {empresas.length > 0 ? (
                <Autocomplete
                  fullWidth
                  id="empresa"
                  value={empresa}
                  onChange={(
                    event: any,
                    newValue: ComboBase<number> | null
                  ) => {
                    setEmpresa(newValue);
                  }}
                  options={empresas}
                  getOptionSelected={(option, value) =>
                    option?.Value === value?.Value
                  }
                  getOptionLabel={(empresa) => empresa.Text}
                  renderInput={(params) => (
                    <TextField {...params} label="Empresa" variant="outlined" />
                  )}
                />
              ) : (
                <div>
                  <Box display="flex" justifyContent="center">
                    <Loader loading></Loader>
                  </Box>
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <AutoCompleteEmpresa
                EmpresaId={stateUnidade.EmpresaId}
                handleEmpresa={setEmpresa}
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

export default UnidadeForm;
