import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { ErrorResponse, CustomResponse } from "../../helpers/Retorno";
import Exercicio from "../../models/Exercicio";
import ExercicioService from "../../services/ExercicioService";
import Loader from "../../components/loader/Loader";
import localization from "../../helpers/material-table-localization";
import { useHistory } from "react-router";
import ExclusaoDialog from "../../components/dialog/ExclusaoDialog";

const Exercicios = () => {
  const history = useHistory();
  const [exercicios, setExercicios] = useState<Exercicio[] | undefined>();
  const { GetAll, Delete } = ExercicioService();
  const [open, setOpen] = useState(false);
  const [exercicioExcluir, setExercicioExcluir] =
    useState<Exercicio | undefined>();

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
      .then((response: CustomResponse<Exercicio[]>) => {
        if (response.Dados) {
          setExercicios(response.Dados);
        }
      })
      .catch((error: ErrorResponse) => {
        console.log(error);
      });
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
      title: "Nome Popular",
      field: "NomePopular",
    },
    {
      title: "Descrição",
      field: "Descricao",
    },
  ];

  return exercicios ? (
    <div>
      <ExclusaoDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        descricao="Confirma a exclusão do exercício "
        nome={exercicioExcluir?.Nome}
      />
      <MaterialTable
        title="Exercícios"
        data={exercicios}
        columns={columns}
        localization={localization}
        options={{
          search: true,
          sorting: true,
          paging: true,
          exportButton: true,
          pageSize: 10,
          emptyRowsWhenPaging: false,
          //actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: "add",
            tooltip: "Adicionar exercício",
            isFreeAction: true,
            onClick: (event) => history.push("/app/exercicios/criar"),
          },
          {
            icon: "edit",
            tooltip: "Editar",
            onClick: (event, rowData) => {
              const exercicio = rowData as Exercicio;
              history.push(`/app/exercicios/editar/${exercicio.Id}`, exercicio);
            },
          },
          (rowData) => ({
            icon: "delete",
            tooltip: "Excluir",
            onClick: (event, rowData) => {
              let exercicio = rowData as Exercicio;
              setExercicioExcluir(exercicio);
              handleClickOpen();
            },
            disabled: !rowData.Ativo,
          }),
        ]}
      />
    </div>
  ) : (
    <div>
      <h2>Carregando exercícios...</h2>
      <Loader loading={true} />
    </div>
  );
};

export default Exercicios;
