import React, { ReactNode, useState } from "react";

export const UserContext = React.createContext({
  user: {
    email: "",
    password: "",
    name: "",
    lastname: "",
    birth: "",
  },
  addUserMailAndPassword: (email: string, password: string) => {},
  addNameAndDateOfBirth: (name: string, lastname: string, birth: string) => {},
  registrationStepTwo: false,
  nextRegistrationStepHandle: (value: boolean) => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
    birth: "",
  });

  const [stepTwo, setStepTwo] = useState(false);

  const addUserMailAndPassword = (email: string, password: string) => {
    setUser((prevState) => ({
      ...prevState,
      email,
      password,
    }));
  };
  const addNameAndDateOfBirth = (
    name: string,
    lastname: string,
    birth: string
  ) => {
    setUser((prevState) => ({
      ...prevState,
      name,
      lastname,
      birth,
    }));
  };

  const nextRegistrationStepHandle = (value: boolean) => {
    setStepTwo(value);
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        addUserMailAndPassword: addUserMailAndPassword,
        registrationStepTwo: stepTwo,
        nextRegistrationStepHandle: nextRegistrationStepHandle,
        addNameAndDateOfBirth: addNameAndDateOfBirth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
