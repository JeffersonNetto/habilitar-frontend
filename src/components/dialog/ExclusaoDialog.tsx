import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

type ExclusaoDialogType = {
  open: boolean;
  handleClose: any;
  handleDelete: any;
  descricao: string;
  nome: string | undefined;
};

const ExclusaoDialog = (props: ExclusaoDialogType) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Exclusão</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.descricao}
          <strong>
            <em>{props.nome}</em>
          </strong>{" "}
          ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={props.handleClose} color="primary">
          Não
        </Button>
        <Button
          variant="contained"
          onClick={props.handleDelete}
          color="secondary"
          autoFocus
        >
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExclusaoDialog;
