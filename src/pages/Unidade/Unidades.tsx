import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { ErrorResponse, CustomResponse } from "../../helpers/Retorno";
import Loader from "../../components/loader/Loader";
import localization from "../../helpers/material-table-localization";
import { useHistory } from "react-router";
import ExclusaoDialog from "../../components/dialog/ExclusaoDialog";
import Unidade from "../../models/Unidade";
import UnidadeService from "../../services/UnidadeService";

const Unidades = () => {
  const history = useHistory();
  const [unidades, setUnidades] = useState<Unidade[] | undefined>();
  const { GetAll, Delete } = UnidadeService();
  const [open, setOpen] = useState(false);
  const [unidadeExcluir, setUnidadeExcluir] = useState<Unidade | undefined>();

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
    GetAll()
      .then((response: CustomResponse<Unidade[]>) => {
        if (response.Dados) {
          setUnidades(response.Dados);
        }
      })
      .catch((error: ErrorResponse) => {});
  }, []);

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
      title: "E-mail",
      field: "Email",
    },
    {
      title: "Telefone",
      field: "Telefone",
    },
    {
      title: "Empresa",
      field: "Empresa.NomeFantasia",
    },
  ];

  return unidades ? (
    <div>
      <ExclusaoDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        descricao="Confirma a exclusão da unidade "
        nome={unidadeExcluir?.Nome}
      />
      <MaterialTable
        title="Unidades"
        data={unidades}
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
            tooltip: "Adicionar unidade",
            isFreeAction: true,
            onClick: (event) => history.push("/app/unidades/criar"),
          },
          {
            icon: "edit",
            tooltip: "Editar",
            onClick: (event, rowData) => {
              const unidade = rowData as Unidade;
              history.push(`/app/unidades/editar/${unidade.Id}`, unidade);
            },
          },
          (rowData) => ({
            icon: "delete",
            tooltip: "Excluir",
            onClick: (event, rowData) => {
              let unidade = rowData as Unidade;
              setUnidadeExcluir(unidade);
              handleClickOpen();
            },
            disabled: !rowData.Ativo,
          }),
        ]}
      />
    </div>
  ) : (
    <div>
      <h2>Carregando unidades...</h2>
      <Loader loading={true} />
    </div>
  );
};

export default Unidades;
