import Box from "@material-ui/core/Box";
import Loader from "../loader/Loader";
import { useEffect, useState } from "react";
import EmpresaService from "../../services/EmpresaService";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";

const EmpresaAutocomplete = ({ formik }) => {

  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    EmpresaService()
      .GetAll()
      .then((response) => {
        setEmpresas(response.Dados);
      })
      .catch((error) => console.log(error));
  }, []);
  
    return empresas.length > 0 ? (
        <Autocomplete
          fullWidth
          id="Empresa"
          value={formik.values.Empresa}
          onChange={(event, newValue) => {
            formik.setFieldValue("EmpresaId", newValue?.Id);
            formik.setFieldValue("Empresa", newValue);
          }}
          options={empresas}
          getOptionSelected={(option, value) =>
            option?.Id === value?.Id
          }
          getOptionLabel={(empresa) => empresa.RazaoSocial}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Empresa"
              variant="outlined"
            />
          )}
        />
      ) : (
        <div>
          <Box display="flex" justifyContent="center">
            <Loader loading></Loader>
          </Box>
        </div>
      )    
  }

  export default EmpresaAutocomplete;