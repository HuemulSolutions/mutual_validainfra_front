import React from "react";
import SaToInput from "../formComponents/SaToInput";
import { columnsDef } from "./SaToAuthUserGlobal";

export function DepartmentId({
  onChange,
  givenValue,
  onClick = null,
  error = false,
  errorText = "",
} = props) {
  const item = columnsDef().find((item) => item.columnName === "departmentId");
  return (
    <SaToInput
      key={item.columnName}
      label={item.label}
      style={{ margin: "10" }}
      value={givenValue}
      name={item.columnName}
      placeholder={item.placeholder}
      required={item.rules[0].required}
      disabledProps={item.formFormat.disabled}
      componentWidth={item.formFormat.width}
      onChange={(value) =>
        onChange(
          value,
          item.formFormat.type,
          item.columnName,
          item.rules[0].required
        )
      }
      onClick={item.formFormat.onClick ? () => onClick() : null}
      error={error}
      errorText={errorText}
    />
  );
}

export function DepartmentDesc({
  onChange,
  givenValue,
  onClick = null,
  error = false,
  errorText = "",
} = props) {
  const item = columnsDef().find(
    (item) => item.columnName === "departmentDesc"
  );
  return (
    <SaToInput
      key={item.columnName}
      label={item.label}
      style={{ margin: "10" }}
      value={givenValue}
      name={item.columnName}
      placeholder={item.placeholder}
      required={item.rules[0].required}
      disabledProps={item.formFormat.disabled}
      componentWidth={item.formFormat.width}
      onChange={(value) =>
        onChange(
          value,
          item.formFormat.type,
          item.columnName,
          item.rules[0].required
        )
      }
      onClick={item.formFormat.onClick ? () => onClick() : null}
      error={error}
      errorText={errorText}
    />
  );
}

export function DepartmentName({
  onChange,
  givenValue,
  onClick = null,
  error = false,
  errorText = "",
} = props) {
  const item = columnsDef().find(
    (item) => item.columnName === "departmentName"
  );
  return (
    <SaToInput
      key={item.columnName}
      label={item.label}
      style={{ margin: "10" }}
      value={givenValue}
      name={item.columnName}
      placeholder={item.placeholder}
      required={item.rules[0].required}
      disabledProps={item.formFormat.disabled}
      componentWidth={item.formFormat.width}
      onChange={(value) =>
        onChange(
          value,
          item.formFormat.type,
          item.columnName,
          item.rules[0].required
        )
      }
      onClick={item.formFormat.onClick ? () => onClick() : null}
      error={error}
      errorText={errorText}
    />
  );
}
