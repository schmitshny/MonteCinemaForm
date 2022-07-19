import { useContext, useEffect } from "react";
import { UserContext } from "../context/user-context";

import classes from "./Welcome.module.scss";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const userName = useContext(UserContext).user.name;
  const userEmail = useContext(UserContext).user.email;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userName) navigate("/");
  }, [userName, navigate]);

  return (
    <main className={classes.main}>
      <header className={classes.main__header}>Good job {userName}</header>
      <p className={classes.main__paragraph}>
        We have sent you an email to{" "}
        <span className={classes.bold}>{userEmail}</span> Make sure to click the
        link from the message to activate your account.
      </p>
      <Button isPrimary={true} text="Go to homepage" />
    </main>
  );
};

export default Welcome;
