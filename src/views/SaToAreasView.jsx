import React from "react";
import SaToFullNavBar from "../components/SaToFullNavBar";
import { SaToAuthUser } from "../components/authUser/SaToAuthUser";
import { EstadoTabla } from "../definicionesGlobales";

export default function SaToAuthUserView() {
  return (
    <SaToFullNavBar
      componente={<SaToAuthUser modoVisualizacion={EstadoTabla.normal} />}
    />
  );
}
