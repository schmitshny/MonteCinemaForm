import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "../../context/user-context";

import FormInput from "../FormInput";
import Button from "../Button";
import FormHeader from "./formHeader/FormHeader";

import usePasswordToggle from "../../hooks/usePasswordToggle";
import { validateEmail, validatePassword } from "../../utilities/validate";
import { errorsMessage } from "../../utilities/validate";

import classes from "./FormFirstStep.module.scss";

const defaultFormData = {
  email: "",
  password: "",
};

const FormFirstStep = () => {
  const [passwordInputType, ToggleIcon] = usePasswordToggle();
  const [formData, setFormData] = useState(defaultFormData);
  const [passwordErrors, setPasswordErrors] = useState<errorsMessage[]>([
    { message: "At least 8 characters" },
    { message: "At least one letter" },
    { message: "At least one digit" },
  ]);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const isMounted = useRef(false);
  const { email, password } = formData;
  const AddMailAndPassword = useContext(UserContext).addUserMailAndPassword;
  const setNextStep = useContext(UserContext).nextRegistrationStepHandle;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setEmailIsValid(validateEmail(email));
  }, [email]);

  useEffect(() => {
    if (isMounted.current) {
      const passwordValidation = validatePassword(password);
      setPasswordErrors(passwordValidation.errors);
      setPasswordIsValid(passwordValidation.passwordIsValid);
    } else {
      isMounted.current = true;
    }
  }, [password]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordIsValid || !emailIsValid) {
      setShowError(true);
      const passwordValidation = validatePassword(password);
      setPasswordErrors(passwordValidation.errors);
      return;
    }
    AddMailAndPassword(email, password);
    setNextStep(true);
  };

  return (
    <>
      <FormHeader firstText="Ahoy you!" secondText="Care to register?" />
      <form className={classes.form} onSubmit={handleOnSubmit}>
        <FormInput
          label="EMAIL"
          placeholder="Something ending with monterail.com"
          name="email"
          onChange={onChange}
          value={email}
          type="text"
          invalid={showError && !emailIsValid}
          formNoValidate={true}
        />
        <div className={classes.form__passwordContainer}>
          <FormInput
            onChange={onChange}
            label="PASSWORD"
            placeholder="Enter your password"
            name="password"
            type={passwordInputType.toString()}
            value={password}
            errorMessages={passwordErrors}
            invalid={showError && !passwordIsValid}
          />
          <span className={classes.toggleIcon}>{ToggleIcon}</span>
        </div>
        <div className={classes.form__buttons}>
          <Button text="Log in instead" isPrimary={false} type="button" />
          <Button text="Next step" isPrimary={true} type="submit" />
        </div>
      </form>
    </>
  );
};

export default FormFirstStep;
