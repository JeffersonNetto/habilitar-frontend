import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box } from "@material-ui/core";

export interface LoadingProps<T> {
  promise?: Promise<T>;
  children: (value?: T) => React.ReactNode;
}

export default function Loading<T>(props: LoadingProps<T>) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [value, setValue] = useState<T>();

  useEffect(() => {
    if (props.promise) {
      setIsLoading(true);
      setErrorMessage(null);

      (async () => {
        try {
          const response = await props.promise;
          setValue(response);
        } catch (error: any) {
          console.error(error);
          setErrorMessage(error.toString());
        } finally {
          setIsLoading(false);
        }
      })();

      // props.promise
      //   .then((response) => {
      //     setValue(response);

      //     setIsLoading(false);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     setErrorMessage(err.toString());
      //     setIsLoading(false);
      //   })
      //   .finally(() => {});
    }
  }, [props.promise]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return isLoading ? (
    <Box display="flex" justifyContent="center">
      <CircularProgress size={30} />
    </Box>
  ) : (
    <>{errorMessage || props.children(value)}</>
  );
}
