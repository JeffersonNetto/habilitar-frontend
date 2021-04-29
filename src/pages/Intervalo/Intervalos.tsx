import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { SuccessResponse, ErrorResponse } from "../../helpers/Retorno";
import Loader from "../../components/loader/Loader";
import localization from "../../helpers/material-table-localization";
import { useHistory } from "react-router";
import ExclusaoDialog from "../../components/dialog/ExclusaoDialog";
import Intervalo from "../../models/Intervalo";
import IntervaloService from "../../services/IntervaloService";

const Intervalos = () => {
  const history = useHistory();
  const [intervalos, setIntervalos] = useState<Intervalo[]>([]);
  const { GetAll, Delete } = IntervaloService();
  const [open, setOpen] = useState(false);
  const [intervaloExcluir, setMetricaExcluir] = useState<
    Intervalo | undefined
  >();

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
      .then((response: SuccessResponse<Intervalo[]>) => {
        if (response.Dados) {
          setIntervalos(response.Dados);
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
      title: "Descrição",
      field: "Descricao",
    },
  ];

  return intervalos && intervalos.length > 0 ? (
    <div>
      <ExclusaoDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        descricao="Confirma a exclusão da métrica "
        nome={intervaloExcluir?.Descricao}
      />
      <MaterialTable
        title="Intervalos"
        data={intervalos}
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
            icon: "edit",
            tooltip: "Editar",
            onClick: (event, rowData) => {
              const intervalo = rowData as Intervalo;
              history.push(`/app/intervalos/editar/${intervalo.Id}`, intervalo);
            },
          },
          (rowData) => ({
            icon: "delete",
            tooltip: "Excluir",
            onClick: (event, rowData) => {
              let intervalo = rowData as Intervalo;
              setMetricaExcluir(intervalo);
              handleClickOpen();
            },
            disabled: !rowData.Ativo,
          }),
        ]}
      />
    </div>
  ) : (
    <div>
      <h2>Carregando intervalos...</h2>
      <Loader loading={true} />
    </div>
  );
};

export default Intervalos;
