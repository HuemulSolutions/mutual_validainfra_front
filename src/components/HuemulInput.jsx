import { React, useState, useEffect } from "react";

export default function HuemulInput({
  refName,
  type,
  name,
  holder,
  label,
  valueOnChange,
  value,
  isDisabled,
  isNecesary,
} = props) {
  const [inputValue, setInputValue] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    // Actualizar el estado si el valor cambia desde props
    setInputValue(value || "");
    setIsEditable(isDisabled);
  }, [value, isDisabled]);

  return (
    <div className={`huemulinput ${isDisabled === true && "editable"}`}>
      {label ? (
        <label htmlFor={name}>
          <div className="label-text">
            {isNecesary ? <p>*</p> : null}
            {label}
          </div>
        </label>
      ) : null}
      <input
        ref={refName}
        disabled={isDisabled}
        id={name}
        className="holderinput"
        type={type}
        name={name}
        value={inputValue}
        placeholder={holder ? holder : undefined}
        onChange={(ev) => {
          setInputValue(ev.target.value);
          valueOnChange(ev.target.value);
        }}
      />
    </div>
  );
}
