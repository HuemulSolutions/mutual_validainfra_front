import React, { useState } from "react";
import SaToAuthUserTable from "./SaToAuthUserTable";

export function SaToAuthUser({ modoVisualizacion, onSelected } = props) {
  const [estado, setEstado] = useState("");
  const handleSetEstado = (nuevoEstado) => {
    setEstado(nuevoEstado);
  };

  return (
    <div className="satogeneraltable">
      <SaToAuthUserTable
        estado={estado}
        onSelected={onSelected}
        modoVisualizacion={modoVisualizacion}
        handleSetEstado={handleSetEstado}
      />
    </div>
  );
}

// const localStore = JSON.parse(localStorage.getItem("santoTomas_decodedToken"));

// const moduleName = "department";
// const create = "c";
// const showMenu = "sm";
// const get = "r";
// const getAll = "ra";
// const update = "u";
// const del = "d";

// export const hasModuleAccess = () => {
//   const hasPermission = localStore.userGrants[moduleName];
//   return hasPermission !== undefined;
// };

// export const hasShowMenuAccess = () => {
//   const hasPermission = localStore.userGrants[moduleName];
//   if (hasPermission === undefined) {
//     return false;
//   }

//   return hasPermission.includes(`;${showMenu};`);
// };

// export const hasCreateAccess = () => {
//   const hasPermission = localStore.userGrants[moduleName];
//   if (hasPermission === undefined) {
//     return false;
//   }

//   return hasPermission.includes(`;${create};`);
// };

// export const hasGetAccess = () => {
//   const hasPermission = localStore.userGrants[moduleName];
//   if (hasPermission === undefined) {
//     return false;
//   }

//   return hasPermission.includes(`;${get};`);
// };

// export const hasGetAllAccess = () => {
//   const hasPermission = localStore.userGrants[moduleName];
//   if (hasPermission === undefined) {
//     return false;
//   }

//   return hasPermission.includes(`;${getAll};`);
// };

// export const hasUpdateAccess = () => {
//   const hasPermission = localStore.userGrants[moduleName];
//   if (hasPermission === undefined) {
//     return false;
//   }

//   return hasPermission.includes(`;${update};`);
// };

// export const hasDeleteAccess = () => {
//   const hasPermission = localStore.userGrants[moduleName];
//   if (hasPermission === undefined) {
//     return false;
//   }

//   return hasPermission.includes(`;${del};`);
// };

// export const authTypes = [
//   { value: "EMAIL", label: "Email" },
//   { value: "AZURE", label: "Azure" },
// ];
