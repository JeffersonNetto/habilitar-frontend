import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import Main from "./components/main/Main";
import CustomRoute from "./helpers/CustomRoute";
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

export function Rotas() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/app" />} />
      <CustomRoute isPrivate={true} path="/app" component={Main} />
      <CustomRoute path="/login" component={Login} />
    </Switch>
  );
}

export function RotasInternas() {
  return (
    <Switch>
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/usuarios"
        component={Usuarios}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/usuarios/criar"
        component={UsuarioForm}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/usuarios/editar/:id"
        component={UsuarioForm}
      />
      <CustomRoute
        isPrivate={true}
        path="/app/fisioterapeutas"
        component={Fisioterapeutas}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/exercicios"
        component={Exercicios}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/exercicios/criar"
        component={ExercicioForm}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/exercicios/editar/:id"
        component={ExercicioForm}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/metricas"
        component={Metricas}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/metricas/criar"
        component={MetricaForm}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/metricas/editar/:id"
        component={MetricaForm}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/intervalos"
        component={Intervalos}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/intervalos/criar"
        component={IntervaloForm}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/intervalos/editar/:id"
        component={IntervaloForm}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/empresas"
        component={Empresas}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/empresas/criar"
        component={EmpresaForm}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/empresas/editar/:id"
        component={EmpresaForm}
      />

      <CustomRoute
        exact
        isPrivate={true}
        path="/app/unidades"
        component={Unidades}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/unidades/criar"
        component={UnidadeForm}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/unidades/editar/:id"
        component={UnidadeForm}
      />

      <CustomRoute
        exact
        isPrivate={true}
        path="/app/grupos"
        component={Grupos}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/grupos/criar"
        component={GrupoForm}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/grupos/editar/:id"
        component={GrupoForm}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/alterar-senha"
        component={AlterarSenha}
      />
      <CustomRoute
        exact
        isPrivate={true}
        path="/app/meu-perfil/:id"
        component={MeuPerfilForm}
      />
    </Switch>
  );
}
