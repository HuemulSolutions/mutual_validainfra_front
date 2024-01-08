import React, { useState, useRef, useEffect } from "react";
import { Modal } from "antd";
import SaToForm from "../SaToForm";
import huemulPutFunc from "../HuemulPutFunc";
import huemulHandleErrors from "../HuemulHandleErrors";
import {
  EstadoFormulario,
  EstadoTabla,
  urlBase,
  orgid,
} from "../../definicionesGlobales";
import { columnsDef, urlModule } from "./SaToAuthUserGlobal";
import {
  DepartmentId,
  DepartmentDesc,
  DepartmentName,
} from "./SaToAuthUserControllers";
import huemulPostModifyFunc from "../HuemulPostModifyFunc";

export default function SaToAuthUserForm({
  isModalVisible,
  selectedRecord,
  filtro,
  estado,
  data,
  handleSetData,
  handleSetModalVisible,
  handleSetFiltrosArray,
  handleSetSelectedRecord,
  handleFormOnChange,
  setVisibleModalArea,
  handleOnSelectedArea,
} = props) {
  const handleSetVisibleModalArea = (modalArea) => {
    setVisibleModalArea(modalArea);
  };

  const [initialFields, setInitialFields] = useState({});

  const [errorFieldsStates, setErrorFieldsStates] = useState([]);

  useEffect(() => {
    setErrorFieldsStates(() =>
      columnsDef().map((item) => {
        if (estado === EstadoFormulario.create) {
          const errorCondition = item.rules[0]?.required && item.showInForm;

          return {
            columnName: item.columnName,
            error: errorCondition,
            errorText: errorCondition ? "Este campo es requerido" : "",
          };
        } else {
          return {
            columnName: item.columnName,
            error: false,
            errorText: "",
          };
        }
      })
    );
  }, [estado]);

  const formatData = (data) => {
    return {
      departmentId: data.departmentId,
      departmentName: data.departmentName,
      departmentDesc: data.departmentDesc,
    };
  };

  const handleUpdateInfo = async () => {
    const postUrl = `${urlBase}${urlModule}`;
    const putData = formatData(selectedRecord);
    const header = { orgid: orgid };

    const response = await huemulPutFunc(postUrl, putData, header);

    if (response.isSuccessful !== true) {
      huemulHandleErrors(response);
    } else {
      const indice = data.findIndex(
        (item) => item.userId === response.data[0].userId
      );
      if (indice >= 0) {
        data[indice] = response.data[0];
      }
      handleSetData([...data]);
      handleSetModalVisible(false);
    }
  };

  const handleCreateInfo = async () => {
    const postUrl = `${urlBase}${urlModule}`;
    const postData = formatData(selectedRecord);
    const header = { orgid: orgid };

    const response = await huemulPostModifyFunc(
      postUrl,
      postData,

      header
    );

    if (response.isSuccessful !== true) {
      huemulHandleErrors(response);
    } else {
      const newData = [...data, response.data[0]];
      handleSetData(newData);
      handleSetModalVisible(false);
    }
  };

  // * Sirve para aplicar cambios en base a los campos del formulario
  const handleOnChange = (columnName, oldValue, newValue, isError) => {
    if (columnName === "userDisplayName" && newValue === "hola") {
      setInitialFields((prev) => {
        return {
          ...prev,
          userEmail: "chao",
        };
      });
    }
    handleFormOnChange(columnName, oldValue, newValue, isError);
  };

  useEffect(() => {
    if (estado === EstadoFormulario.create) {
      setInitialFields({
        departmentId: "",
        departmentName: "",
        departmentDesc: "",
      });
    } else if (estado === EstadoFormulario.edit) {
      if (selectedRecord === null) {
        return;
      }

      columnsDef().forEach((item) => {
        if (item.rules[0]?.required && item.showInForm) {
          if (selectedRecord[item.columnName] === "") {
            handleSetErrorFieldsStates(
              item.columnName,
              true,
              "Este campo es requerido"
            );
          } else {
            handleSetErrorFieldsStates(item.columnName, false, "");
          }
        }
      });

      setInitialFields(dataToForm(selectedRecord));
    }
  }, [estado, selectedRecord, filtro]);

  const dataToForm = (data) => {
    return {
      departmentId: data.departmentId,
      departmentName: data.departmentName,
      departmentDesc: data.departmentDesc,
    };
  };

  const handleSetErrorFieldsStates = (columnName, error, errorText) => {
    setErrorFieldsStates((prev) => {
      const indice = prev.findIndex((item) => item.columnName === columnName);
      prev[indice] = {
        columnName: columnName,
        error: error,
        errorText: errorText,
      };
      return [...prev];
    });
  };

  function handlePuntosDeNumero(valorConPuntos) {
    const valorSinPuntos = valorConPuntos.replace(/\./g, "");
    const numeroEntero = parseInt(valorSinPuntos, 10);
    return numeroEntero;
  }

  const handleOnChangeValue = (value, type, columnName, required) => {
    const oldValue = initialFields[columnName];

    if (required && value === "") {
      setInitialFields((prev) => ({
        ...prev,
        [columnName]: value,
      }));
      handleSetErrorFieldsStates(columnName, true, "Este campo es requerido");
      handleFormOnChange(columnName, oldValue, value, true);
    } else {
      switch (type) {
        case "text":
          setInitialFields((prev) => ({
            ...prev,
            [columnName]: value,
          }));
          handleSetErrorFieldsStates(columnName, false, "");
          handleFormOnChange(columnName, oldValue, value, false);
          break;
        case "switch":
          setInitialFields((prev) => ({
            ...prev,
            [columnName]: value,
          }));
          handleSetErrorFieldsStates(columnName, false, "");
          handleFormOnChange(columnName, oldValue, value, false);
          break;
        case "number":
          if (isNaN(value)) {
            setInitialFields((prev) => ({
              ...prev,
              [columnName]: value,
            }));
            if (isNaN(handlePuntosDeNumero(value))) {
              handleSetErrorFieldsStates(
                columnName,
                true,
                "Solo se permiten números"
              );
              handleFormOnChange(columnName, oldValue, value, true);
            } else {
              handleSetErrorFieldsStates(columnName, false, "");
              handleFormOnChange(columnName, oldValue, value, false);
            }
          } else {
            setInitialFields((prev) => ({
              ...prev,
              [columnName]: value,
            }));
            handleSetErrorFieldsStates(columnName, false, "");
            handleFormOnChange(columnName, oldValue, value, false);
          }
          break;
        case "date":
          setInitialFields((prev) => ({
            ...prev,
            [columnName]: value,
          }));
          handleSetErrorFieldsStates(columnName, false, "");
          handleFormOnChange(columnName, oldValue, value, false);
          break;
        case "select":
          setInitialFields((prev) => ({
            ...prev,
            [columnName]: value,
          }));
        default:
          setInitialFields((prev) => ({
            ...prev,
            [columnName]: value,
          }));
          handleSetErrorFieldsStates(columnName, false, "");
          handleFormOnChange(columnName, oldValue, value, false);
          break;
      }
    }
  };

  const findError = (columnName) => {
    if (errorFieldsStates.length === 0) {
      return {
        error: false,
        errorText: "",
      };
    } else {
      const error = errorFieldsStates.find(
        (item) => item.columnName === columnName
      );
      return {
        error: error.error,
        errorText: error.errorText,
      };
    }
  };

  const selectedArea = (itemSelected) => {
    setInitialFields((prev) => ({
      ...prev,
      departmentName: itemSelected.departmentName,
    }));
    handleSetErrorFieldsStates("departmentName", false, "");
    handleFormOnChange(
      "departmentName",
      "",
      itemSelected.departmentName,
      false
    );
    handleOnSelectedArea(itemSelected);
  };

  const layout = () => {
    const {
      departmentId: departmentIdValue,
      departmentName: departmentNameValue,
      departmentDesc: departmentDescValue,
    } = initialFields;

    const estilosDivRow = {
      display: "flex",
      flexDirection: "row",
    };

    const estilosDivCenter = {
      alignItems: "center",
      justifyContent: "center",
    };

    const estilosDivColumn = {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    };

    return (
      <div>
        <div style={estilosDivColumn}>
          <DepartmentId
            onChange={handleOnChangeValue}
            givenValue={departmentIdValue}
            error={findError("departmentId").error}
            errorText={findError("departmentId").errorText}
          />
          <DepartmentName
            onChange={handleOnChangeValue}
            givenValue={departmentNameValue}
            onClick={() => handleSetVisibleModalArea(true)}
            error={findError("departmentName").error}
            errorText={findError("departmentName").errorText}
          />
          <DepartmentDesc
            onChange={handleOnChangeValue}
            givenValue={departmentDescValue}
            error={findError("departmentDesc").error}
            errorText={findError("departmentDesc").errorText}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <SaToForm
        modalVisible={isModalVisible}
        filtro={filtro}
        estado={estado}
        recordSelected={selectedRecord}
        handleModalVisible={handleSetModalVisible}
        handleFiltrosArray={handleSetFiltrosArray}
        handleSetSelectedRecord={handleSetSelectedRecord}
        initialFields={initialFields}
        handleUpdateInfo={handleUpdateInfo}
        handleCreateInfo={handleCreateInfo}
        handleFormOnChange={handleOnChange}
        errorFieldsStates={errorFieldsStates}
        layout={layout()}
        showSaveButton={true}
        camposFormularios={columnsDef}
      />
    </>
  );
}
