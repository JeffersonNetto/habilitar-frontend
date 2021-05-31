import Snackbar from "@material-ui/core/Snackbar";
import Alert, { Color } from "@material-ui/lab/Alert";
import { Dispatch, SetStateAction } from "react";

export interface AlertMessage {
  severity: Color | undefined;
  message: string | string[];
}

interface CustomSnackbarProps {
  alertMessage: AlertMessage;
  state: [boolean, Dispatch<SetStateAction<boolean>>];
}

const CustomSnackbar = ({ alertMessage, state }: CustomSnackbarProps) => {
  const [open, setOpen] = state;

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
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
        <div style={{ fontSize: "1rem" }}>{alertMessage.message}</div>
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
