import { dateToStringFormat } from "../../definicionesGlobales";

export const columnsDef = () => {
  return [
    {
      label: "Id",
      columnName: "departmentId",
      showInFilter: true,
      rules: [{ required: true, message: "Por favor, ingresa el id." }],
      formFormat: {
        type: "text",
        width: 200,
        placeholder: "",
        canEdit: true,
      },
      widthForTablet: 50,
      widthForMobile: 50,
      alignment: "left",
      dataFormat: "",
      renderCell: (text) => text,
      showInTabletMode: false,
      showInMobileMode: false,
    },
    {
      label: "Nombre",
      columnName: "departmentName",
      showInFilter: true,
      rules: [{ required: true, message: "Por favor, ingresa el nombre." }],
      formFormat: { type: "text", width: 200, placeholder: "" },
      widthForTablet: 250,
      widthForMobile: 250,
      alignment: "left",
      dataFormat: "",
      renderCell: (text) => text,
      showInTabletMode: true,
      showInMobileMode: true,
    },
    {
      label: "Descendente",
      columnName: "departmentDesc",
      showInFilter: true,
      rules: [{ required: true, message: "Por favor, ingresa el nombre." }],
      formFormat: { type: "text", width: 200, placeholder: "" },
      widthForTablet: 250,
      widthForMobile: 250,
      alignment: "left",
      dataFormat: "",
      renderCell: (text) => text,
      showInTabletMode: true,
      showInMobileMode: true,
    },
  ];
};

export const urlModule = "/department/v1/";
