import React, { useRef, useState, useEffect } from "react";
import { Button, Modal } from "antd";
import SaToTable from "../SaToTable";
import huemulGetFunc from "../HuemulGetFunc";
import SaToAuthUserForm from "./SaToAuthUserForm";
import huemulHandleErrors from "../HuemulHandleErrors";
import {
  EstadoFormulario,
  EstadoTabla,
  orgid,
  urlBase,
} from "../../definicionesGlobales";
import { columnsDef, urlModule } from "./SaToAuthUserGlobal";

export default function SaToAuthUserTable({
  estado,
  onSelected,
  modoVisualizacion,
  handleSetEstado,
} = props) {
  const cuantityOfRows = 10;
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const handleSetData = (datos) => {
    setData(datos);
  };
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visibleModalArea, setVisibleModalArea] = useState(false);
  const [filtrosArray, setFiltrosArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState({
    caption: "",
    columnName: "",
    value: "",
  });
  const [loadMoreStatus, setLoadMoreStatus] = useState({
    disabled: false,
    text: "Cargar más",
  });
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState({
    visible: false,
    record: null,
  });

  const fetchData = async (pagina, clearCache = false, filter = "") => {
    setLoading(true);
    const getUrl = clearCache
      ? `${urlBase}${urlModule}?limit=${cuantityOfRows * pagina}&page=1${
          filter === ""
            ? ""
            : filter.map((item) => `&${item.columnName}=${item.value}`).join("")
        }`
      : `${urlBase}${urlModule}?limit=${cuantityOfRows}&page=${pagina}`;
    const header = { orgid: orgid };

    const response = await huemulGetFunc(getUrl, header);

    if (response.isSuccessful !== true) {
      setLoading(false);
      huemulHandleErrors(response);
    } else {
      if (response.data.length / page < cuantityOfRows) {
        setLoadMoreStatus({ disabled: true, text: "No hay más registros" });
      }
      setLoading(false);
      if (clearCache) {
        setData(response.data);
        return;
      } else {
        setData((prevData) => [...prevData, ...response.data]);
        return;
      }
    }
  };

  const handleEditClick = (selectedData) => {
    setSelectedRecord(selectedData);
    setIsModalVisible(true);
    handleSetEstado(EstadoFormulario.edit);
  };

  const handleFilterClick = (columnName) => {
    const campo = columnsDef().filter(
      (item) => item.columnName === columnName
    )[0];

    setFiltro({
      caption: campo.label,
      columnName: campo.columnName,
      value: filtrosArray.find((item) => item.columnName === columnName)?.value,
    });
    setSelectedRecord({});
    handleSetEstado(EstadoFormulario.filter);
    setIsModalVisible(true);
  };

  const handleCreateClick = () => {
    setSelectedRecord({});
    handleSetEstado(EstadoFormulario.create);
    setIsModalVisible(true);
  };

  const handleSetModalVisible = (modelState) => {
    setIsModalVisible(modelState);
  };

  const handleSetFiltrosArray = (filtros) => {
    setFiltrosArray(filtros);
    setIsModalVisible(false);
  };

  const handleSetSelectedRecord = (record) => {
    setSelectedRecord(record);
  };

  const handleFormOnChange = (columnName, oldValue, newValue, isError) => {
    // TODO: sirve para implementar cambios que sean desencadenados por el cambio de un valor en el formulario
    // console.log("columnName", columnName);
    // console.log("oldValue", oldValue);
    // console.log("newValue", newValue);
    // console.log("isError", isError);
  };

  const handleDeleteClick = async (selectedData) => {
    const deleteUrl = `${urlBase}${urlModule}${selectedData.userId}`;
    const header = { orgid: orgid };

    const response = await saToDeleteFunc(deleteUrl, header);

    if (response.isSuccessful !== true) {
      huemulHandleErrors(response);
    } else {
      const newData = data.filter(
        (item) => item.userId !== selectedData.userId
      );
      setData(newData);
    }
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleSetSelectedRow = (selectedRow) => {
    onSelected(selectedRow);
  };

  const handleOkDelete = () => {
    handleDeleteClick(isConfirmModalVisible.record);
    setIsConfirmModalVisible({ visible: false, record: null });
  };

  const handleCancelDelete = () => {
    setIsConfirmModalVisible({ visible: false, record: null });
  };

  // * Tabla relacionada
  //TODO
  //!
  //?
  const handleOnSelectedArea = (itemSelected) => {
    setVisibleModalArea(false);
    setSelectedRecord({
      ...selectedRecord,
      departmentName: itemSelected.departmentName,
      departmentId: itemSelected.departmentId,
    });
  };

  useEffect(() => {
    fetchData(page, true, filtrosArray);
  }, [filtrosArray]);

  useEffect(() => {
    fetchData(page, page === 1 ? true : false, filtrosArray);
  }, [page]);

  const columns = columnsDef()
    .filter((item) => item.showInTabletMode === true && item.showInMobileMode)
    .map((item) => ({
      title: item.label,
      dataIndex: item.columnName,
      key: item.columnName,
      width: item.widthForTablet,
      align: item.alignment,
      render: (text) => item.renderCell(text),
      filter: false,
      sorter: false,
    }));

  if (modoVisualizacion === EstadoTabla.normal) {
    columns.push({
      title: "Acciones",
      dataIndex: "options",
      key: "options",
      width: 150,
      render: (text, record) => (
        <div className="btn-utilidad">
          <>
            <Button
              className="btn-edit"
              onClick={() => handleEditClick(data[record.key])}>
              <img src="/icons/editar.png" alt="Editar" />
            </Button>
            <Button
              className="btn-delete"
              onClick={() =>
                setIsConfirmModalVisible({
                  visible: true,
                  record: data[record.key],
                })
              }>
              <img src="/icons/eliminar.png" alt="Eliminar" />
            </Button>
            <Modal
              title="Confirmación"
              open={isConfirmModalVisible.visible}
              onOk={handleOkDelete}
              onCancel={handleCancelDelete}>
              <p>
                ¿Está seguro que desea eliminar el registro{" "}
                {isConfirmModalVisible.record === null
                  ? "registro"
                  : isConfirmModalVisible.record.departmentName}
                ?
              </p>
            </Modal>
          </>
        </div>
      ),
    });
  }

  return (
    <>
      <header>
        <h1>Administración de Usuarios</h1>
        <div className="create-reload-btn">
          <Button
            className="btn-create btns"
            onClick={() => handleCreateClick()}>
            <img src="./icons/crear.png" alt="Crear" />
          </Button>
          <Button
            className="btn-reload btns"
            onClick={() => fetchData(page, true, filtrosArray)}>
            <img src="./icons/reload.png" alt="Reload" />
          </Button>
        </div>
      </header>
      <div className="filtros">
        {columnsDef().map((item, index) => {
          if (item.showInFilter) {
            return (
              <Button
                className={`filtro ${
                  filtrosArray.find(
                    (itemName) => itemName.columnName === item.columnName
                  ) !== undefined &&
                  filtrosArray.find(
                    (itemName) => itemName.columnName === item.columnName
                  ).value !== ""
                    ? "filtro-activo"
                    : ""
                }`}
                key={index}
                onClick={() => handleFilterClick(item.columnName)}>
                {filtrosArray.find(
                  (itemName) => itemName.columnName === item.columnName
                ) === undefined ||
                filtrosArray.find(
                  (itemName) => itemName.columnName === item.columnName
                ).value === ""
                  ? `Filtrar por ${item.label}`
                  : filtrosArray.find(
                      (itemName) => itemName.columnName === item.columnName
                    ).value}
              </Button>
            );
          }
        })}
      </div>
      <SaToTable
        loading={loading}
        incomeData={data}
        modoVisualizacion={modoVisualizacion}
        handleSetSelectedRow={handleSetSelectedRow}
        columns={columns}
      />

      <Button
        className="more-btn"
        onClick={() => handleLoadMore()}
        disabled={loadMoreStatus.disabled}>
        {loadMoreStatus.text}
      </Button>

      <SaToAuthUserForm
        isModalVisible={isModalVisible}
        filtro={filtro}
        estado={estado}
        data={data}
        selectedRecord={selectedRecord}
        visibleModalArea={visibleModalArea}
        handleSetData={handleSetData}
        handleSetModalVisible={handleSetModalVisible}
        handleSetFiltrosArray={handleSetFiltrosArray}
        handleSetSelectedRecord={handleSetSelectedRecord}
        handleFormOnChange={handleFormOnChange}
        setVisibleModalArea={setVisibleModalArea}
        handleOnSelectedArea={handleOnSelectedArea}
      />
    </>
  );
}
