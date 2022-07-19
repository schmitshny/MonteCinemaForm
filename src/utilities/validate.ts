export type errorsMessage = {
  message: string;
  isValid?: boolean;
};

export const validatePassword = (value: string) => {
  const errors: errorsMessage[] = [];
  let passwordIsValid = true;

  if (value.trim().length < 8) {
    errors.push({ message: "At least 8 characters", isValid: false });
    passwordIsValid = false;
  } else {
    errors.push({ message: "At least 8 characters", isValid: true });
  }

  const regexCointainsLetter = /[a-zA-Z]/;
  if (regexCointainsLetter.test(value)) {
    errors.push({ message: "At least one letter", isValid: true });
  } else {
    errors.push({ message: "At least one letter", isValid: false });
    passwordIsValid = false;
  }

  const regexContainsDigit = /\d/;
  if (regexContainsDigit.test(value)) {
    errors.push({ message: "At least one digit", isValid: true });
  } else {
    errors.push({ message: "At least one digit", isValid: false });
    passwordIsValid = false;
  }

  return { errors: errors, passwordIsValid: passwordIsValid };
};

export const validateEmail = (value: string) => {
  const emailPattern = /^\S+@\S+\.\S+$/;
  const isEmailValid = emailPattern.test(value);

  return isEmailValid;
};

export const validateName = (value: string) => {
  if (value.trim().length > 0) return true;
  return false;
};

export const validateDate = (value: string) => {
  let error: errorsMessage = { message: "You should be minimum 18 years old" };
  const dateOfBirth = new Date(value);
  const yearsDate = new Date();
  yearsDate.setFullYear(yearsDate.getFullYear() - 18);

  const isDateValid = dateOfBirth <= yearsDate;

  if (!isDateValid)
    error = { message: "You should be minimum 18 years old", isValid: false };
  else error = { message: "You should be minimum 18 years old", isValid: true };

  return { error, isDateValid };
};

// "At least 8 characters",
// "At least one letter",
// "At least one digit",
