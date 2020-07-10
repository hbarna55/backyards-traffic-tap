import Error from "components/Form/StyledElements/Error/Error";
import Input from "components/Form/StyledElements/Input/Input";
import Label from "components/Form/StyledElements/Label/Label";
import useRefState from "hooks/useRefState";
import { default as React } from "react";

type OwnProps = {
  name: string;
  label: string;
  errors?: any;
  register?: Function;
  validators?: Validators;
  className?: string;
  isDisabled?: boolean;
  autoComplete?: string;
  overRideValue?: string | number | boolean;
  handleChange?: (value: string | number | boolean) => void;
};

const TextField = ({
  name,
  label,
  errors,
  register,
  validators,
  className,
  isDisabled,
  autoComplete,
  overRideValue,
  handleChange,
}: OwnProps) => {
  const { value, setValue } = useRefState(register!, name, "", overRideValue);

  return (
    <div style={{ width: "100%" }}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type="text"
        name={name}
        className={className + `${errors?.[name]?.message ? " invalid" : ""}`}
        disabled={isDisabled}
        value={value}
        autoComplete={autoComplete}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          errors[name] = null;
          validators &&
            validators.every((validator) => {
              const result = validator.callback(e.target.value);
              !result && (errors[name] = validator);
              return result;
            });
          if (!errors[name] || e.target.value === "") {
            setValue(e.target.value);
            handleChange && handleChange(e.target.value);
          }
        }}
      />
      <Error>{errors && errors?.[name] ? errors?.[name]?.message : ""}</Error>
    </div>
  );
};

export default TextField;
