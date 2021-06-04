import ptBR from "date-fns/locale/pt-BR";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useField } from 'formik';

const CustomDatePicker = ({label, ...props}) => {
  const [field, meta, helpers] = useField(props);

  return (
    <MuiPickersUtilsProvider
    locale={ptBR}
    utils={DateFnsUtils}
  >
    <KeyboardDatePicker    
      {...field}
      fullWidth
      autoOk      
      invalidDateMessage="A data informada é inválida"
      variant="inline"
      margin="none"      
      label={label}
      inputVariant="outlined"
      format="dd/MM/yyyy"
      value={field.value || null}
      onChange={(value) => helpers.setValue(value)}
      error={
        meta.touched &&
        Boolean(meta.error)
      }
      helperText={
        meta.touched &&
        meta.error
      }
    />
  </MuiPickersUtilsProvider>
  )
}

export default CustomDatePicker;