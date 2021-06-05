import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useField } from "formik";

const CustomSelect = ({label, options, userId = null, ...props}) => {
  const [field, meta] = useField(props);

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
        {          
          options.map(option => <MenuItem value={option.value}>{option.text}</MenuItem>)                            
        }
        {/* <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="Auxiliar">Auxiliar</MenuItem>
        <MenuItem value="Fisioterapeuta">Fisioterapeuta</MenuItem>
        <MenuItem value="Paciente">Paciente</MenuItem> */}
      </Select>
      {meta.touched && Boolean(meta.error) && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomSelect;