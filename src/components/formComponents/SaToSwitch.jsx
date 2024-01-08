import "./SaToSwitch.css";

export default function SaToSwitch({
  label,
  name,
  value = false,
  onChange,
} = props) {
  return (
    <div className="satoswitch">
      <p>{label}</p>
      <label className="switch" htmlFor={name}>
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}
