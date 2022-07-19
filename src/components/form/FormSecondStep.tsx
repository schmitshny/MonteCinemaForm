import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import FormHeader from "./formHeader/FormHeader";
import classes from "./FormSecondStep.module.scss";
import FormInput from "../FormInput";
import Button from "../Button";

import {
  errorsMessage,
  validateDate,
  validateName,
} from "../../utilities/validate";
import { UserContext } from "../../context/user-context";

const defaultFormData = {
  name: "",
  surname: "",
  dateOfBirth: "",
  isPrivacyAccepted: false,
};

const FormSecondStep = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const { name, surname, dateOfBirth, isPrivacyAccepted } = formData;
  const [areInputsValid, setIsInputValid] = useState({
    isNameValid: false,
    isLastNameValid: false,
    isDateOfBirthValid: false,
    isPrivacyValid: isPrivacyAccepted,
  });
  const { isNameValid, isLastNameValid, isDateOfBirthValid, isPrivacyValid } =
    areInputsValid;
  const [dateError, setDateError] = useState<errorsMessage>({
    message: "You should be minimum 18 years old",
  });
  const [showError, setShowError] = useState(false);
  const addData = useContext(UserContext).addNameAndDateOfBirth;
  const navigate = useNavigate();
  const isMounted = useRef(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    setIsInputValid({
      isNameValid: validateName(formData.name),
      isLastNameValid: validateName(formData.surname),
      isDateOfBirthValid: validateDate(formData.dateOfBirth).isDateValid,
      isPrivacyValid: formData.isPrivacyAccepted,
    });
  }, [formData]);

  useEffect(() => {
    if (isMounted.current) {
      const dateValidation = validateDate(dateOfBirth);
      setDateError(dateValidation.error);
    } else {
      isMounted.current = true;
    }
  }, [dateOfBirth]);

  const checkboxOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      isPrivacyAccepted: e.target.checked,
    }));
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      isNameValid &&
      isLastNameValid &&
      isDateOfBirthValid &&
      isPrivacyValid
    ) {
      addData(name, surname, dateOfBirth);
      navigate("Welcome");
    } else {
      setShowError(true);
      setDateError({
        message: "You should be minimum 18 years old",
        isValid: false,
      });
    }
  };

  return (
    <>
      <FormHeader firstText="Great!" secondText="Now your name" />
      <form className={classes.form} onSubmit={handleOnSubmit}>
        <FormInput
          label="First name"
          placeholder="e.g. Jessica"
          name="name"
          type="text"
          onChange={onChange}
          invalid={!areInputsValid.isNameValid && showError}
          value={name}
        />
        <FormInput
          label="Last name"
          placeholder="e.g. Walton"
          name="surname"
          type="text"
          onChange={onChange}
          invalid={!areInputsValid.isLastNameValid && showError}
          value={surname}
        />
        <FormInput
          label="Date of birth"
          placeholder="DD/MM/YYYY"
          name="dateOfBirth"
          type="text"
          onChange={onChange}
          invalid={!areInputsValid.isDateOfBirthValid && showError}
          value={dateOfBirth}
          errorMessages={[dateError]}
        />
        <div className={classes.checkbox}>
          <input type="checkbox" onChange={checkboxOnChange} />
          <span className={classes.checkbox__label}>
            I accept <a href="/">Privacy Policy</a>
          </span>
        </div>

        <div className={classes.form__buttons}>
          <Button text="Log in instead" isPrimary={false} type="button" />
          <Button text="Next step" isPrimary={true} type="submit" />
        </div>
      </form>
    </>
  );
};

export default FormSecondStep;
