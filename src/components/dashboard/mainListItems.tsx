import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import { useContext } from "react";
import { Context } from "../../context/AuthContext";

export const MainListItems = () => {
  const { role } = useContext(Context);

  return (
    <div>
      {role && role === "Admin" && (
        <ListItem button>
          <Link
            to="/app/usuarios"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
          </Link>
          <Link
            to="/app/usuarios"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <ListItemText primary="Usuários" />
          </Link>
        </ListItem>
      )}

      <ListItem button>
        <Link
          to="/app/exercicios"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
        </Link>
        <Link
          to="/app/exercicios"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItemText primary="Exercícios" />
        </Link>
      </ListItem>

      <ListItem button>
        <Link
          to="/app/metricas"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
        </Link>
        <Link
          to="/app/metricas"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItemText primary="Métricas" />
        </Link>
      </ListItem>

      <ListItem button>
        <Link
          to="/app/intervalos"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
        </Link>
        <Link
          to="/app/intervalos"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemText primary="Intervalos" />
        </Link>
      </ListItem>

      <ListItem button>
        <Link
          to="/app/empresas"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
        </Link>
        <Link
          to="/app/empresas"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItemText primary="Empresas" />
        </Link>
      </ListItem>

      <ListItem button>
        <Link
          to="/app/unidades"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
        </Link>
        <Link
          to="/app/unidades"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItemText primary="Unidades" />
        </Link>
      </ListItem>

      <ListItem button>
        <Link
          to="/app/grupos"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
        </Link>
        <Link
          to="/app/grupos"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItemText primary="Grupos" />
        </Link>
      </ListItem>
    </div>
  );
};
