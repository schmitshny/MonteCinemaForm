import React from "react";
import classes from "./Button.module.scss";

type ButtonProps = {
  text: string;
  isPrimary: boolean;
  type?: "submit" | "button";
  onClick?: (par: any) => void;
};

const Button: React.FC<ButtonProps> = ({ text, isPrimary, onClick, type }) => {
  return (
    <button
      className={`${classes.button} ${isPrimary ? classes.redBackground : ""} `}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
