import classes from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const heart = <FontAwesomeIcon icon={faHeart} color="red" />;

const Header = () => {
  return (
    <header className={classes.header}>
      <img src="/assets/logo.svg" alt="logo" />
      <p className={classes.header__caption}>
        Developed with {heart} by Monterail
      </p>
    </header>
  );
};

export default Header;
