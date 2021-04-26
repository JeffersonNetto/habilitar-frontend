import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  })
);

const Loader = ({ loading = false }) => {
  const classes = useStyles();

  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress size={30} />
      </div>
    );
  }

  return <></>;
};

export default Loader;
