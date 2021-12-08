import Box from "@material-ui/core/Box";
import Loader from "../loader/Loader";
import { useEffect, useState } from "react";
import GrupoService from "../../services/GrupoService";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";

const GrupoAutocomplete = ({ formik }) => {

  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    GrupoService
      .GetAll()
      .then((response) => {
        setGrupos(response.Dados);
      })
      .catch((error) => console.log(error));
  }, []);
  
    return grupos.length > 0 ? (
        <Autocomplete
          multiple
          filterSelectedOptions
          fullWidth
          id="Grupo"
          value={formik.values.Grupo}
          onChange={(event, newValue) => {
            formik.setFieldValue("GrupoId", newValue.Id);
            formik.setFieldValue("Grupo", newValue);
            formik.setFieldValue("ExercicioGrupo.GrupoId", newValue.Id);
          }}
          options={grupos}
          getOptionSelected={(option, value) =>
            option?.Id === value?.Id
          }
          getOptionLabel={(grupo) => grupo.Descricao}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Grupo"
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

  export default GrupoAutocomplete;