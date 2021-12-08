import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { ErrorResponse, CustomResponse } from "../../helpers/Retorno";
import Loader from "../../components/loader/Loader";
import localization from "../../helpers/material-table-localization";
import { useNavigate } from "react-router";
import ExclusaoDialog from "../../components/dialog/ExclusaoDialog";
import Grupo from "../../models/Grupo";
import GrupoService from "../../services/GrupoService";

const Grupos = () => {
  const navigate = useNavigate();
  const [grupos, setGrupos] = useState<Grupo[] | undefined>();
  const [open, setOpen] = useState(false);
  const [grupoExcluir, setGrupoExcluir] = useState<Grupo | undefined>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setOpen(false);
    // Delete(exercicioExcluir!.Id)
    //   .then((response: Retorno<Exercicio>) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  useEffect(() => {
    GrupoService.GetAll()
      .then((response: CustomResponse<Grupo[]>) => {
        setGrupos(response.Dados);
        setTimeout(() => {}, 1000);
      })
      .catch((error: ErrorResponse) => {});
  }, []);

  const columns = [
    {
      title: "Id",
      field: "Id",
    },
    {
      title: "Descrição",
      field: "Descricao",
    },
  ];

  return grupos ? (
    <div>
      <ExclusaoDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        descricao="Confirma a exclusão do grupo "
        nome={grupoExcluir?.Descricao}
      />
      <MaterialTable
        title="Grupos"
        data={grupos}
        columns={columns}
        localization={localization}
        options={{
          search: true,
          sorting: true,
          paging: true,
          exportButton: true,
          //actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: "add",
            tooltip: "Adicionar intervalo",
            isFreeAction: true,
            onClick: (event) => navigate("/app/grupos/criar"),
          },
          {
            icon: "edit",
            tooltip: "Editar",
            onClick: (event, rowData) => {
              const grupo = rowData as Grupo;
              navigate(`/app/grupos/editar/${grupo.Id}`, { state: grupo });
            },
          },
          (rowData) => ({
            icon: "delete",
            tooltip: "Excluir",
            onClick: (event, rowData) => {
              let grupo = rowData as Grupo;
              setGrupoExcluir(grupo);
              handleClickOpen();
            },
            disabled: !rowData.Ativo,
          }),
        ]}
      />
    </div>
  ) : (
    <div>
      <h2>Carregando grupos...</h2>
      <Loader loading={true} />
    </div>
  );
};

export default Grupos;
