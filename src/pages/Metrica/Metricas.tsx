import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { SuccessResponse, ErrorResponse } from "../../helpers/Retorno";
import Loader from "../../components/loader/Loader";
import localization from "../../helpers/material-table-localization";
import { useHistory } from "react-router";
import ExclusaoDialog from "../../components/dialog/ExclusaoDialog";
import Metrica from "../../models/Metrica";
import MetricaService from "../../services/MetricaService";

const Metricas = () => {
  const history = useHistory();
  const [metricas, setMetricas] = useState<Metrica[]>([]);
  const { GetAll, Delete } = MetricaService();
  const [open, setOpen] = useState(false);
  const [metricaExcluir, setMetricaExcluir] = useState<Metrica | undefined>();

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
      .then((response: SuccessResponse<Metrica[]>) => {
        if (response.Dados) {
          setMetricas(response.Dados);
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
    {
      title: "Sigla",
      field: "Sigla",
    },
    {
      title: "Observação",
      field: "Observacao",
    },
  ];

  return metricas && metricas.length > 0 ? (
    <div>
      <ExclusaoDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        descricao="Confirma a exclusão da métrica "
        nome={metricaExcluir?.Descricao}
      />
      <MaterialTable
        title="Métricas"
        data={metricas}
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
              const metrica = rowData as Metrica;
              history.push(`/app/metricas/editar/${metrica.Id}`, metrica);
            },
          },
          (rowData) => ({
            icon: "delete",
            tooltip: "Excluir",
            onClick: (event, rowData) => {
              let metrica = rowData as Metrica;
              setMetricaExcluir(metrica);
              handleClickOpen();
            },
            disabled: !rowData.Ativo,
          }),
        ]}
      />
    </div>
  ) : (
    <div>
      <h2>Carregando métricas...</h2>
      <Loader loading={true} />
    </div>
  );
};

export default Metricas;
