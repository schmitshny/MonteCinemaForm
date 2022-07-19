import React, { InputHTMLAttributes } from "react";
import classes from "./FormInput.module.scss";
import { errorsMessage } from "./../utilities/validate";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  errorMessages?: errorsMessage[];
  type?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
  invalid: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  errorMessages,
  type,
  name,
  value,
  onChange,
  invalid,
  ...rest
}) => {
  return (
    <div className={classes.formInput}>
      <label className={classes.formInput__label}>{label}</label>
      <input
        className={`${classes.formInput__input} ${
          invalid ? classes.formInput__input__invalid : "sdfd"
        }`}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      />

      {errorMessages
        ? errorMessages.map(({ message, isValid }) => (
            <span
              className={`${classes.formInput__errorMessage} ${
                isValid === undefined
                  ? ""
                  : isValid
                  ? classes.valid
                  : classes.error
              }  `}
              key={message}
            >
              {message}
            </span>
          ))
        : null}
    </div>
  );
};

export default FormInput;
