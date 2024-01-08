import React from "react";
import "./SaToNumber.css";

export default function SaToNumber({
  label,
  value = "",
  name,
  sonMiles = false,
  placeholder,
  componentWidth = 100,
  required = false,
  disabledProps = false,
  error = false,
  errorText = "",
  isReadOnly = false,
  // * Otra funcion
  onChange,
  onClick,
} = props) {
  const handleInputChange = (event) => {
    const inputText = event.target.value;
    const cleanedText = inputText.replace(/[^\d]/g, "");
    const formattedValue = cleanedText.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedValue;
  };

  function obtenerSoloNumeros(valor) {
    return valor.replace(/\D/g, "");
  }
  return (
    <div className="satonumber" style={{ width: componentWidth }}>
      <label htmlFor={name}>
        {label}
        {required && <p>*</p>}
      </label>
      <input
        readOnly={isReadOnly}
        type="text"
        disabled={disabledProps ? true : null}
        id={name}
        {...(onClick && { onClick: onClick })}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={(e) => {
          if (sonMiles) {
            onChange(handleInputChange(e));
          } else {
            onChange(obtenerSoloNumeros(e.target.value));
          }
        }}
      />
      {error && <p className="error">{errorText}</p>}
    </div>
  );
}
