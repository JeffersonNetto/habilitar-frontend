import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "../context/AuthContext";

export default function CustomRoute({ isPrivate = false, ...rest }) {
  const { loading, authenticated, role } = useContext(Context);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />;
  }

  if (
    isPrivate &&
    authenticated &&
    rest.path.includes("usuarios") &&
    role !== "Admin"
  ) {
    return <></>;
  }

  return <Route {...rest} />;
}
