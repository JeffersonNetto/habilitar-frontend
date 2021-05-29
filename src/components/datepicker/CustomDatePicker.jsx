import Utils from '@date-io/date-fns'
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import DatePicker from "material-ui-pickers/DatePicker";
import ptBR from "date-fns/locale/pt-BR";

const CustomDatePicker = ({
    name,
    form: { setFieldValue },
    field: { value },
    ...rest
  }) => {
    // console.log(rest);
    return (
      <MuiPickersUtilsProvider locale={ptBR} utils={Utils}>
        <DatePicker
          fullWidth
          variant="outlined"
          margin="none"
          name={name}
          keyboard
          clearable
          autoOk
          label="Data de nascimento"
          format="dd/MM/yyyy"
          placeholder="dd/mm/aaaa"
          // handle clearing outside => pass plain array if you are not controlling value outside
          // mask={(value) =>
          //   value
          //     ? [/[0-3]/, /\d/, "/", /0|1/, /\d/, "/", /1|2/, /\d/, /\d/, /\d/]
          //     : []
          // }
          disableOpenOnEnter
          onChange={(value) => {
            console.log("setting value to", value);
            setFieldValue("date", value);
          }}
          value={value}
          animateYearScrolling={false}
      />
      </MuiPickersUtilsProvider>      
    );
  };

  export default CustomDatePicker;