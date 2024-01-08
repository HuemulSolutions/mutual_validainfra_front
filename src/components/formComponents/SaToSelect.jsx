import React from "react";
import "./SaToSelect.css";

export default function SaToSelect({
  label,
  value = "",
  name,
  placeholder,
  componentWidth = 100,
  required = false,
  disabledProps = false,
  error = false,
  errorText = "",
  // * Otra funcion
  onChange,
  onClick,
  options = [],
} = props) {
  return (
    <div className="satoselect" style={{ width: componentWidth }}>
      <label htmlFor={name}>
        {label}
        {required && <p>*</p>}
      </label>
      <select
        type="text"
        disabled={disabledProps ? true : null}
        id={name}
        {...(onClick && { onClick: onClick })}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
        }}>
        <option value="">Seleccione {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="error">{errorText}</p>}
    </div>
  );
}
