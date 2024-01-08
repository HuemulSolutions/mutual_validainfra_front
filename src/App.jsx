import "./App.css";
import "./SaToGeneralTable.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SaToAreasView from "./views/SaToAreasView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SaToAreasView />} />
      </Routes>
    </BrowserRouter>
  );
}
