import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useField } from "formik";
import ComboBase from "../../view-models/ComboBase";

const SimpleSelect = (props: {
  label: string;
  name: string;
  options: ComboBase<string>[];
}) => {
  const [field, meta] = useField(props.name);

  return (
    <FormControl
      variant="outlined"
      fullWidth
      error={meta.touched && Boolean(meta.error)}
    >
      <InputLabel id="select-label-perfil">{props.label}</InputLabel>
      <Select
        labelId={`select-label-${props.label}`}
        {...field}
        id={`select-${props.label}`}
        autoWidth
        label={props.label}
        placeholder={props.label}
      >
        <MenuItem value="">
          <em></em>
        </MenuItem>
        {props.options.map((option: ComboBase<string>) => (
          <MenuItem value={option.Value}>{option.Text}</MenuItem>
        ))}
      </Select>
      {meta.touched && Boolean(meta.error) && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default SimpleSelect;
