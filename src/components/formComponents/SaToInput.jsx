import React, { useEffect, useState } from "react";
import "./SaToInput.css";

export default function SaToInput({
  label,
  value = "",
  name,
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
  return (
    <div className="satoinput" style={{ width: componentWidth }}>
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
          onChange(e.target.value);
        }}
      />
      {error && <p className="error">{errorText}</p>}
    </div>
  );
}
