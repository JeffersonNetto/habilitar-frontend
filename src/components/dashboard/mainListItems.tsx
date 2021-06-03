import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/AuthContext";
import SupervisedUserCircleRounded from "@material-ui/icons/SupervisedUserCircleRounded";
import TransferWithinAStationRounded from "@material-ui/icons/TransferWithinAStationRounded";
import Timeline from "@material-ui/icons/Timeline";
import DateRangeRounded from "@material-ui/icons/DateRangeRounded";
import BusinessRounded from "@material-ui/icons/BusinessRounded";
import GroupWorkRounded from "@material-ui/icons/GroupWorkRounded";
import HomeWorkRounded from "@material-ui/icons/HomeWorkRounded";

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
              <SupervisedUserCircleRounded />
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
            <TransferWithinAStationRounded />
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
            <Timeline />
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
            <DateRangeRounded />
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
            <BusinessRounded />
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
            <HomeWorkRounded />
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
            <GroupWorkRounded />
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
