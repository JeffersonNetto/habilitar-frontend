import { createContext } from "react";

import LoginService from "../services/LoginService";

const Context = createContext();

function AuthProvider({ children }) {
  const {
    authenticated,
    loading,
    handleLogin,
    handleLogout,
    usuarioLogado,
  } = LoginService();

  return (
    <Context.Provider
      value={{
        loading,
        authenticated,
        handleLogin,
        handleLogout,
        usuarioLogado,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };