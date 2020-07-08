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
  className,
  isDisabled,
  autoComplete,
  overRideValue,
  handleChange,
}: OwnProps) => {
  const { value, setValue } = useRefState(register!, name, "", overRideValue);

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="text"
        name={name}
        className={className + `${errors?.[name]?.messageKey ? " invalid" : ""}`}
        disabled={isDisabled}
        value={value}
        autoComplete={autoComplete}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
          handleChange && handleChange(e.target.value);
        }}
      />
      {errors?.[name] && <div>{errors?.[name]?.messageKey}</div>}
    </div>
  );
};

export default TextField;