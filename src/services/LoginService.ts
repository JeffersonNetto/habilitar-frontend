import Usuario from "../models/Usuario";
import api from "../interceptor/http-interceptor";
import { useState, useEffect } from "react";
import { SuccessResponse } from "../helpers/Retorno";

const url = "usuario/login";

export default function LoginService() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario>();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin(usuario: Usuario) {
    try {
      const { data } = await api.post<SuccessResponse<Usuario>>(
        url,
        JSON.stringify(usuario),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (data.Dados?.Token) {
        localStorage.setItem("token", data.Dados.Token);
        api.defaults.headers.Authorization = `Bearer ${data.Dados.Token}`;
        setAuthenticated(true);
        setUsuarioLogado(data.Dados);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async function handleLogout() {
    setAuthenticated(false);
    setUsuarioLogado(undefined);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
  }

  return { authenticated, loading, handleLogin, handleLogout, usuarioLogado };
}
