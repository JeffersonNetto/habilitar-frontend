import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { ErrorResponse, CustomResponse } from "../../helpers/Retorno";
import localization from "../../helpers/material-table-localization";
import UsuarioService from "../../services/UsuarioService";
import { format } from "date-fns";
import User from "../../models/User";
import { Card, CardMedia } from "@material-ui/core";

const Usuarios = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<User[] | undefined>([]);
  const columns = [
    {
      title: "Nome",
      field: "Nome",
    },
    {
      title: "Sobrenome",
      field: "Sobrenome",
    },
    {
      title: "Data de nascimento",
      field: "DataNascimento",
      render: (row: User) =>
        row.DataNascimento &&
        format(new Date(row.DataNascimento), "dd/MM/yyyy"),
    },
    {
      title: "Telefone",
      field: "PhoneNumber",
    },
  ];

  useEffect(() => {
    UsuarioService.GetAll()
      .then((response: CustomResponse<User[]>) => {
        setUsuarios(response.Dados);
      })
      .catch((error: ErrorResponse) => {
        console.log(error);
      });
  }, []);

  return usuarios && usuarios.length > 0 ? (
    <div>
      <Card
        variant="outlined"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <CardMedia
          image="/NEW_USER.png"
          style={{ minHeight: "20rem", minWidth: "34rem" }}
        ></CardMedia>
      </Card>

      <MaterialTable
        title="Usuários"
        data={usuarios}
        columns={columns}
        localization={localization}
        options={{
          search: true,
          sorting: true,
          paging: true,
          exportButton: true,
        }}
        actions={[
          {
            icon: "add",
            tooltip: "Adicionar usuário",
            isFreeAction: true,
            onClick: (event) => navigate("/app/usuarios/criar"),
          },
          {
            icon: "edit",
            tooltip: "Editar",
            onClick: (event, rowData) => {
              const usuario = rowData as User;
              navigate(`/app/usuarios/editar/${usuario.Id}`, {
                state: usuario,
              });
            },
          },
        ]}
      />
    </div>
  ) : (
    <div>
      <h2>Carregando usuários...</h2>
      <Loader loading={true} />
    </div>
  );
};

export default Usuarios;
