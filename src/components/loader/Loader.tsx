import CircularProgress from "@material-ui/core/CircularProgress";
import { Box } from "@material-ui/core";

const Loader = (props: { loading: boolean; children?: JSX.Element }) => {
  return props.loading ? (
    <Box display="flex" justifyContent="center">
      <CircularProgress size={30} />
    </Box>
  ) : (
    props.children || <></>
  );
};

export default Loader;
