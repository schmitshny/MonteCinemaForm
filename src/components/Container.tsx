import classes from "./Container.module.scss";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Container: React.FC<Props> = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default Container;
