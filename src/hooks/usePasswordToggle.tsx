import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const usePasswordToggle = () => {
  const [visible, setVisible] = useState(false);

  const Icon = (
    <FontAwesomeIcon
      icon={visible ? faEyeSlash : faEye}
      onClick={() => setVisible((visible) => !visible)}
    />
  );

  const InputType: string = visible ? "text" : "password";

  return [InputType, Icon];
};

export default usePasswordToggle;
