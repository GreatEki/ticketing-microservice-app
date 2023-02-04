import React from "react";
import styles from "./Input.module.css";

interface Props {
  type: string;
  name: string;
  value: any;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Input: React.FC<Props> = (props) => {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor={props.name}>
        {" "}
        {props.label}{" "}
      </label>
      <input
        className={styles.input}
        type={props.type}
        required={props.required}
        onChange={props.onChange}
        name={props.name}
        value={props.value}
      />
    </div>
  );
};

export default Input;
