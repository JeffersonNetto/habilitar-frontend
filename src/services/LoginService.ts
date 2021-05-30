import { ErrorResponse } from "./../helpers/Retorno";
import Usuario from "../models/User";
import api from "../interceptor/http-interceptor";
import { useState, useEffect } from "react";
import LoginResponseViewModel from "../view-models/LoginResponseViewModel";
import LoginViewModel from "../view-models/LoginViewModel";
import { CustomResponse } from "../helpers/Retorno";
import jwt_decode from "jwt-decode";
interface Jwt {
  aud: string;
  email: string;
  exp: string;
  iat: string;
  iss: string;
  nbf: string;
  role: string;
  sub: string;
}

const url = "auth/entrar";

export default function LoginService() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario>();
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);

      const jwt: Jwt = jwt_decode(token);
      setRole(jwt.role);
    }

    setLoading(false);
  }, []);

  async function handleLogin(usuario: LoginViewModel) {
    try {
      const { data } = await api.post<CustomResponse<LoginResponseViewModel>>(
        url,
        JSON.stringify(usuario),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (data.Dados.AccessToken) {
        localStorage.setItem("token", data.Dados.AccessToken);
        api.defaults.headers.Authorization = `Bearer ${data.Dados.AccessToken}`;
        setAuthenticated(true);
        setUsuarioLogado(data.Dados.User);
      }

      return data;
    } catch (error: any) {
      console.log("error", typeof error.response);
      throw error.response;
    }
  }

  async function handleLogout() {
    setAuthenticated(false);
    setUsuarioLogado(undefined);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
  }

  return {
    authenticated,
    loading,
    handleLogin,
    handleLogout,
    usuarioLogado,
    role,
  };
}
