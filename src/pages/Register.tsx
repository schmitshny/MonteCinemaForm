import FormFirstStep from "../components/form/FormFirstStep";
import FormSecondStep from "../components/form/FormSecondStep";
import Container from "../components/Container";

import { UserContext } from "../context/user-context";
import { useContext } from "react";

const Register = () => {
  const registrationStepTwo = useContext(UserContext).registrationStepTwo;

  return (
    <Container>
      {registrationStepTwo ? <FormSecondStep /> : <FormFirstStep />}
    </Container>
  );
};

export default Register;
