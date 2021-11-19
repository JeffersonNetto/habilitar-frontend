import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Main from "./components/main/Main";
import PrivateRoute from "./helpers/PrivateRoute";
import Usuarios from "./pages/Usuario/Usuarios";
import Fisioterapeutas from "./pages/Fisioterapeuta/Fisioterapeutas";
import UsuarioForm from "./pages/Usuario/UsuarioForm";
import Exercicios from "./pages/Exercicio/Exercicios";
import ExercicioForm from "./pages/Exercicio/ExercicioForm";
import Metricas from "./pages/Metrica/Metricas";
import MetricaForm from "./pages/Metrica/MetricaForm";
import IntervaloForm from "./pages/Intervalo/IntervaloForm";
import Intervalos from "./pages/Intervalo/Intervalos";
import EmpresaForm from "./pages/Empresa/EmpresaForm";
import Empresas from "./pages/Empresa/Empresas";
import Unidades from "./pages/Unidade/Unidades";
import UnidadeForm from "./pages/Unidade/UnidadeForm";
import GrupoForm from "./pages/Grupo/GrupoForm";
import Grupos from "./pages/Grupo/Grupos";
import AlterarSenha from "./pages/Usuario/AlterarSenha";
import MeuPerfilForm from "./pages/Usuario/MeuPerfilForm";
import Metas from "./pages/Meta/Metas";
import MetaForm from "./pages/Meta/MetaForm";

export function Rotas() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        }
      />

      <Route
        path="/app"
        element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        }
      >
        <Route
          path="/app/usuarios"
          element={
            <PrivateRoute>
              <Usuarios />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/usuarios/criar"
          element={
            <PrivateRoute>
              <UsuarioForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/usuarios/editar/:id"
          element={
            <PrivateRoute>
              <UsuarioForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/fisioterapeutas"
          element={
            <PrivateRoute>
              <Fisioterapeutas />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/exercicios"
          element={
            <PrivateRoute>
              <Exercicios />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/exercicios/criar"
          element={
            <PrivateRoute>
              <ExercicioForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/exercicios/editar/:id"
          element={
            <PrivateRoute>
              <ExercicioForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/metricas"
          element={
            <PrivateRoute>
              <Metricas />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/metricas/criar"
          element={
            <PrivateRoute>
              <MetricaForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/metricas/editar/:id"
          element={
            <PrivateRoute>
              <MetricaForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/intervalos"
          element={
            <PrivateRoute>
              <Intervalos />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/intervalos/criar"
          element={
            <PrivateRoute>
              <IntervaloForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/intervalos/editar/:id"
          element={
            <PrivateRoute>
              <IntervaloForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/empresas"
          element={
            <PrivateRoute>
              <Empresas />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/empresas/criar"
          element={
            <PrivateRoute>
              <EmpresaForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/empresas/editar/:id"
          element={
            <PrivateRoute>
              <EmpresaForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/unidades"
          element={
            <PrivateRoute>
              <Unidades />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/unidades/criar"
          element={
            <PrivateRoute>
              <UnidadeForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/unidades/editar/:id"
          element={
            <PrivateRoute>
              <UnidadeForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/grupos"
          element={
            <PrivateRoute>
              <Grupos />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/grupos/criar"
          element={
            <PrivateRoute>
              <GrupoForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/grupos/editar/:id"
          element={
            <PrivateRoute>
              <GrupoForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/alterar-senha"
          element={
            <PrivateRoute>
              <AlterarSenha />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/meu-perfil/:id"
          element={
            <PrivateRoute>
              <MeuPerfilForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/metas"
          element={
            <PrivateRoute>
              <Metas />
            </PrivateRoute>
          }
        />

        <Route
          path="/app/metas/criar"
          element={
            <PrivateRoute>
              <MetaForm />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="*" element={<h2>Página não encontrada</h2>} />
    </Routes>
  );
}
