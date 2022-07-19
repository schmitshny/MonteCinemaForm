import classes from "./FormHeader.module.scss";
const FormHeader: React.FC<{ firstText: string; secondText?: string }> = ({
  firstText,
  secondText,
}) => {
  return (
    <header className={classes.formHeader}>
      <p>{firstText}</p>
      <p className={classes.formHeader__gray}>{secondText}</p>
    </header>
  );
};

export default FormHeader;
