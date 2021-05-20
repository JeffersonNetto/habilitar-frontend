import TextField from "@material-ui/core/TextField";
import { useField } from "formik";

interface CustomTextFieldProps {
  label: string;
  name: string;
}

const CustomTextField = ({ label, ...props }: CustomTextFieldProps) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      fullWidth
      variant="outlined"
      {...field}
      label={label}
      placeholder={label}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export default CustomTextField;
