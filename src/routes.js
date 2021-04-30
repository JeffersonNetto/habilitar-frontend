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
        path="/app/empresas/editar/:id"
        component={EmpresaForm}
      />
    </Switch>
  );
}
