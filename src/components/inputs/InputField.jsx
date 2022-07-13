import React from "react";
import "./assets/input.css";

export default function InputField({
  text,
  width,
  height,
  margin,
  setData,
  value,
  disabled
}) {
    const date = new Date();
  return (
    <div className="input-field" style={{ margin: `${margin}` }}>
      <input
        className="text-field__input"
        style={{ width: `${width}`, height: `${height}` }}
        placeholder="sdsdsd"
        onChange={setData}
        value={value || disabled && `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}
        disabled={disabled}
      />
      <label className="text-field__label" htmlFor="email">
        {text}
      </label>
    </div>
  );
}
