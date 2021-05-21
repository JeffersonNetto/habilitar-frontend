import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Loader from "../../components/loader/Loader";
import { useHistory } from "react-router-dom";
import { ErrorResponse, CustomResponse } from "../../helpers/Retorno";
import localization from "../../helpers/material-table-localization";
import PessoaService from "../../services/PessoaService";
import Pessoa from "../../models/Pessoa";
import { format } from "date-fns";

const Usuarios = () => {
  const history = useHistory();
  const { GetAll } = PessoaService();
  const [usuarios, setUsuarios] = useState<Pessoa[] | undefined>([]);
  const columns = [
    {
      title: "Id",
      field: "Id",
    },
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
      render: (row: Pessoa) =>
        format(new Date(row.DataNascimento), "dd/MM/yyyy"),
    },
  ];

  useEffect(() => {
    GetAll()
      .then((response: CustomResponse<Pessoa[]>) => {
        setUsuarios(response.Dados);
      })
      .catch((error: ErrorResponse) => {
        console.log(error);
      });
  }, []);

  return usuarios && usuarios.length > 0 ? (
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
          onClick: (event) => history.push("/app/usuarios/criar"),
        },
        {
          icon: "edit",
          tooltip: "Editar",
          onClick: (event, rowData) => {
            const usuario = rowData as Pessoa;
            history.push(`/app/usuarios/editar/${usuario.Id}`, usuario);
          },
        },
      ]}
    />
  ) : (
    <div>
      <h2>Carregando usuários...</h2>
      <Loader loading={true} />
    </div>
  );
};

export default Usuarios;
