import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { ErrorResponse, CustomResponse } from "../../helpers/Retorno";
import Loader from "../../components/loader/Loader";
import localization from "../../helpers/material-table-localization";
import { useNavigate } from "react-router";
import ExclusaoDialog from "../../components/dialog/ExclusaoDialog";
import Meta from "../../models/Meta";
import MetaService from "../../services/MetaService";
import { Card, CardMedia } from "@material-ui/core";

const Metas = () => {
  const navigate = useNavigate();
  const [metas, setEmpresas] = useState<Meta[] | undefined>();
  const [open, setOpen] = useState(false);
  const [metaExcluir, setMetaExcluir] = useState<Meta | undefined>();

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
    MetaService.GetAll()
      .then((response: CustomResponse<Meta[]>) => {
        if (response.Dados) {
          setEmpresas(response.Dados);
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
  ];

  return metas ? (
    <div>
      <ExclusaoDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        descricao="Confirma a exclusão da meta "
        nome={metaExcluir?.Id.toString()}
      />

      <Card
        variant="outlined"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <CardMedia
          image="/EMPRESA.png"
          style={{ minHeight: "20rem", minWidth: "50rem" }}
        ></CardMedia>
      </Card>

      <MaterialTable
        title="Metas"
        data={metas}
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
            tooltip: "Adicionar meta",
            isFreeAction: true,
            onClick: (event) => navigate("/app/metas/criar"),
          },
          {
            icon: "edit",
            tooltip: "Editar",
            onClick: (event, rowData) => {
              const meta = rowData as Meta;
              navigate(`/app/metas/editar/${meta.Id}`, {
                state: meta,
              });
            },
          },
          (rowData) => ({
            icon: "delete",
            tooltip: "Excluir",
            onClick: (event, rowData) => {
              let meta = rowData as Meta;
              setMetaExcluir(meta);
              handleClickOpen();
            },
            disabled: !rowData.Ativo,
          }),
        ]}
      />
    </div>
  ) : (
    <div>
      <h2>Carregando metas...</h2>
      <Loader loading={true} />
    </div>
  );
};

export default Metas;
