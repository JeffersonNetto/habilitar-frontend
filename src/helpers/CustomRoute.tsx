import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "../context/AuthContext";
import User from "../models/User";
import UserViewModel from "../view-models/UserViewModel";

export default function CustomRoute({ isPrivate = false, ...rest }) {
  const { loading, authenticated, usuarioLogado } = useContext(Context);

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
    usuarioLogado
  ) {
    let user = usuarioLogado as UserViewModel;

    if (!user.Claims.find((c) => c.Type === "role" && c.Value === "Admin")) {
      return <></>;
    }
  }

  return <Route {...rest} />;
}
