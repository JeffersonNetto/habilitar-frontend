import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { SuccessResponse, ErrorResponse } from "../../helpers/Retorno";
import Loader from "../../components/loader/Loader";
import localization from "../../helpers/material-table-localization";
import { useHistory } from "react-router";
import ExclusaoDialog from "../../components/dialog/ExclusaoDialog";
import Empresa from "../../models/Empresa";
import EmpresaService from "../../services/EmpresaService";

const Empresas = () => {
  const history = useHistory();
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const { GetAll, Delete } = EmpresaService();
  const [open, setOpen] = useState(false);
  const [empresaExcluir, setEmpresaExcluir] = useState<Empresa | undefined>();

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
      .then((response: SuccessResponse<Empresa[]>) => {
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
    {
      title: "Nome Fantasia",
      field: "NomeFantasia",
    },
    {
      title: "Razão Social",
      field: "RazaoSocial",
    },
    {
      title: "CNPJ",
      field: "Cnpj",
    },
  ];

  return empresas && empresas.length > 0 ? (
    <div>
      <ExclusaoDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        descricao="Confirma a exclusão do empresa "
        nome={empresaExcluir?.NomeFantasia}
      />
      <MaterialTable
        title="Empresas"
        data={empresas}
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
              const empresa = rowData as Empresa;
              history.push(`/app/empresas/editar/${empresa.Id}`, empresa);
            },
          },
          (rowData) => ({
            icon: "delete",
            tooltip: "Excluir",
            onClick: (event, rowData) => {
              let empresa = rowData as Empresa;
              setEmpresaExcluir(empresa);
              handleClickOpen();
            },
            disabled: !rowData.Ativo,
          }),
        ]}
      />
    </div>
  ) : (
    <div>
      <h2>Carregando empresas...</h2>
      <Loader loading={true} />
    </div>
  );
};

export default Empresas;
