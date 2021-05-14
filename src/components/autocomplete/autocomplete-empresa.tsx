import Autocomplete from "@material-ui/lab/Autocomplete";
import { useEffect, useState } from "react";
import ComboBase from "../../view-models/ComboBase";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Loader from "../../components/loader/Loader";
import EmpresaService from "../../services/EmpresaService";
import { CustomResponse } from "../../helpers/Retorno";
import { useFormikContext } from "formik";

export const AutoCompleteEmpresa = (props: any) => {
  const [empresas, setEmpresas] = useState<ComboBase<number>[]>([]);
  const [empresa, setEmpresa] = useState<ComboBase<number> | null>(null);

  useEffect(() => {
    if (empresas.length > 0) {
      let temp = empresas.find((e) => e.Value === props.EmpresaId);

      if (temp) {
        setEmpresa(temp);
        props.handleEmpresa(temp);
      }
    }
  }, [empresas, props]);

  useEffect(() => {
    EmpresaService()
      .GetCombo()
      .then((response: CustomResponse<ComboBase<number>[]>) => {
        setEmpresas(response.Dados);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return empresas.length > 0 ? (
    <Autocomplete
      fullWidth
      id="empresa"
      value={empresa}
      onChange={(event: any, newValue: ComboBase<number> | null) => {
        setEmpresa(newValue);
        props.handleEmpresa(newValue);
      }}
      options={empresas}
      getOptionSelected={(option, value) => option?.Value === value?.Value}
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
  );
};
