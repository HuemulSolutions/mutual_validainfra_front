import React, { useEffect, useState } from "react";
import "./SaToInput.css";

export default function SaToDate({
  label,
  value = "",
  name,
  placeholder,
  componentWidth = 100,
  required = false,
  disabled: disabledProps = false,
  error = false,
  minValue = false,
  maxValue = new Date().toISOString().split("T")[0],
  errorText = "",
  // * Otra funcion
  onChange,
  onClick,
} = props) {
  return (
    <div className="satodate satoinput" style={{ width: componentWidth }}>
      <label htmlFor={name}>
        {label}
        {required && <p>*</p>}
      </label>
      <input
        type="date"
        id={name}
        {...(onClick && { onClick: onClick })}
        // {...(minValue && { min: minValue })}
        // {...(maxValue && { max: maxValue })}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        disabled={disabledProps ? true : null}
      />
      {error && <p className="error">{errorText}</p>}
    </div>
  );
}
