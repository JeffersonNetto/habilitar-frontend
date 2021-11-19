import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useField } from "formik";
import { useEffect, useState } from "react";
import { CustomResponse } from "../../helpers/Retorno";
import UnidadeService from "../../services/UnidadeService";
import ComboBase from "../../view-models/ComboBase";
import Loading from "../loader/Loading";

const UnidadeSelect = ({
  label = "Unidade",
  name = "UnidadeId",
}: {
  label?: string;
  name?: string;
}) => {
  const [field, meta] = useField(name);
  const [promise, setPromise] =
    useState<Promise<CustomResponse<ComboBase<string>[]>>>();

  useEffect(() => {
    setPromise(UnidadeService.GetCombo());
  }, []);

  return (
    <Loading promise={promise}>
      {(response: CustomResponse<ComboBase<string>[]> | undefined) => {
        return (
          <FormControl
            variant="outlined"
            fullWidth
            error={meta.touched && Boolean(meta.error)}
          >
            <InputLabel id="select-label-perfil">{label}</InputLabel>
            <Select
              labelId={`select-label-${label}`}
              {...field}
              id={`select-${label}`}
              autoWidth
              label={label}
              placeholder={label}
            >
              <MenuItem value="">
                <em></em>
              </MenuItem>
              {response?.Dados.map((option: ComboBase<string>) => (
                <MenuItem value={option.Value}>{option.Text}</MenuItem>
              ))}
            </Select>
            {meta.touched && Boolean(meta.error) && (
              <FormHelperText>{meta.error}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    </Loading>
  );
};

export default UnidadeSelect;
