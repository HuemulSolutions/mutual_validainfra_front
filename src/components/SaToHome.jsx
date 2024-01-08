import React from "react";
import { Button } from "antd";

export default function SaToHome() {
  return (
    <div className="satohome">
      <header>
        <h1>Gestión grupal</h1>
        <Button>Acciones</Button>
      </header>
      <div className="valores">
        <div className="card">
          <h2>1778</h2>
          <p>Totál estudiantes</p>
        </div>
        <div className="divisor"></div>
        <div className="card">
          <h2>461</h2>
          <p>Estudiantes que requieren de seguimiento</p>
        </div>
        <div className="divisor"></div>
        <div className="card">
          <h2>2.17%</h2>
          <h2>(10)</h2>
          <p>Seguimiento realizado</p>
        </div>
        <div className="divisor"></div>
        <div className="card">
          <h2>6</h2>
          <p>Estudiantes preinscritos en apoyo</p>
        </div>
        <div className="divisor"></div>
        <div className="card">
          <h2>0.43%</h2>
          <h2>(2)</h2>
          <p>Inscripción en apoyo</p>
        </div>
      </div>
      <div className="filtro">
        <Button>Agregar filtro</Button>
      </div>
      <hr />
    </div>
  );
}
