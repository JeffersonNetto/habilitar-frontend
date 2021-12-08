import { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { Context } from "../context/AuthContext";

// export default function CustomRoute({ isPrivate = false, ...rest }) {
//   const { loading, authenticated, role } = useContext(Context);

//   if (loading) {
//     return <h1>Carregando...</h1>;
//   }

//   if (isPrivate && !authenticated) {
//     return <Navigate to="/login" />;
//   }

//   if (
//     isPrivate &&
//     authenticated &&
//     rest.path.includes("usuarios") &&
//     role !== "Admin"
//   ) {
//     return <></>;
//   }

//   return <Route {...rest} />;
// }

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { loading, authenticated, role } = useContext(Context);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return authenticated ? children : <Navigate to="/login" />;
}
