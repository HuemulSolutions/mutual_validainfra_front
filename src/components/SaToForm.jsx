import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { EstadoFormulario } from "../definicionesGlobales";

export default function SaToForm({
  initialFields,
  modalVisible,
  filtro,
  estado,
  layout,
  handleModalVisible,
  errorFieldsStates,
  handleFiltrosArray,
  handleUpdateInfo,
  handleCreateInfo,
  handleSetSelectedRecord,
  showSaveButton,
} = props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [created, setCreated] = useState(false);
  const [filtroConsulta, setFiltroConsulta] = useState([]);
  const [formInitialFields, setFormInitialFields] = useState({});
  const [isOkDisable, setIsOkDisable] = useState(true);

  const [form] = Form.useForm();

  const handleModalCancel = () => {
    handleSetSelectedRecord(null);
    setIsModalVisible(false);
    handleModalVisible(false);
  };

  const handleModalOk = () => {
    if (estado === EstadoFormulario.edit) {
      handleSetSelectedRecord(formInitialFields);
      setUpdated(true);
    } else if (estado === EstadoFormulario.create) {
      handleSetSelectedRecord(formInitialFields);
      setCreated(true);
    } else if (estado === EstadoFormulario.filter) {
      form.validateFields().then((values) => {
        setFiltroConsulta((prev) => {
          const existingFilterIndex = prev.findIndex(
            (f) => f.columnName === filtro.columnName
          );
          if (existingFilterIndex === -1) {
            return [
              ...prev,
              {
                columnName: filtro.columnName,
                value: values[filtro.columnName],
              },
            ];
          } else {
            prev[existingFilterIndex].value = values[filtro.columnName];
            return [...prev];
          }
        });
      });
    }
    // });
  };

  const handleCleanFilter = () => {
    setFiltroConsulta((prev) => {
      const existingFilterIndex = prev.findIndex(
        (f) => f.columnName === filtro.columnName
      );
      if (existingFilterIndex !== -1) {
        prev[existingFilterIndex].value = "";
        return [...prev];
      }
    });
  };

  useEffect(() => {
    if (updated) {
      handleUpdateInfo();
      setUpdated(false);
    }
  }, [updated]);

  useEffect(() => {
    if (created) {
      handleCreateInfo();
      setCreated(false);
    }
  }, [created]);

  useEffect(() => {
    if (modalVisible === true) {
      setFormInitialFields(initialFields);
    }
  }, [initialFields]);

  useEffect(() => {
    handleFiltrosArray(filtroConsulta);
  }, [filtroConsulta]);

  useEffect(() => {
    setIsModalVisible(modalVisible);
  }, [modalVisible]);

  useEffect(() => {
    if (errorFieldsStates) {
      const areAnyErrors = errorFieldsStates.some((item) => item.error);
      if (areAnyErrors) {
        setIsOkDisable(true);
      } else {
        setIsOkDisable(false);
      }
    }
  }, [errorFieldsStates]);

  return (
    <div className="satoform">
      <Modal
        width={600}
        forceRender
        style={{
          right: 0,
          top: 0,
          bottom: 0,
          position: "fixed",
        }}
        getContainer={false}
        title={
          estado === EstadoFormulario.edit
            ? "Editar"
            : estado === EstadoFormulario.create
            ? "Crear"
            : "Filtrar"
        }
        open={isModalVisible}
        onOk={handleModalOk}
        isOkDisabled={isOkDisable}
        okText={estado === EstadoFormulario.edit ? "Actualizar" : "Crear"}
        onCancel={handleModalCancel}
        {...((estado === EstadoFormulario.filter || !showSaveButton) && {
          footer: [
            <Button key="1" onClick={handleCleanFilter}>
              Limpiar
            </Button>,
            <Button key="2" onClick={handleModalCancel}>
              Cancelar
            </Button>,
            showSaveButton && (
              <Button key="3" onClick={handleModalOk}>
                Filtrar
              </Button>
            ),
          ],
        })}>
        {estado === EstadoFormulario.edit ||
        estado === EstadoFormulario.create ? (
          <div>{layout}</div>
        ) : (
          // TODO: Cambiar el filtro a un fomrulario normal
          <Form form={form}>
            <Form.Item
              label={filtro.caption}
              name={filtro.columnName}
              rules={[
                { required: false, message: "Por favor, ingrese el filtro." },
              ]}
              key="filtro">
              <Input
                initialvalues={
                  filtroConsulta.find(
                    (item) => item.columnName === filtro.columnName
                  )?.value
                }
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}
