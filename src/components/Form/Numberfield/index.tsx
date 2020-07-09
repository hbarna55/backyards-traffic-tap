import useRefState from "hooks/useRefState";
import React from "react";

type OwnProps = {
  name: string;
  label: string;
  errors?: any;
  register?: Function;
  validators?: Validators;
  className?: string;
  isDisabled?: boolean;
  autoComplete?: string;
};

const NumberField = ({ name, label, errors, register, className, isDisabled, autoComplete }: OwnProps) => {
  const { value, setValue } = useRefState(register!, name, "", null);

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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
      {errors?.[name] && <div>{errors?.[name]?.messageKey}</div>}
    </div>
  );
};

export default NumberField;
