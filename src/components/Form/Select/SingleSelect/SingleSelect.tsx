import useRefState from "hooks/useRefState";
import React, { useCallback, useMemo } from "react";
import Select from "react-select-virtualized";
import { OptionsType, ValueType } from "react-select/src/types";

type OwnProps = {
  options: OptionsType<Option>;
  name: string;
  label: string;
  errors?: any;
  register?: Function;
  validators?: Validators;
  className?: string;
  isDisabled?: boolean;
  overRideValue?: string | number | boolean;
  handleChange?: (option: Option) => void;
};

const SingleSelect = ({
  options = [],
  label,
  name,
  isDisabled,
  errors,
  className,
  register,
  overRideValue,
  handleChange,
}: OwnProps) => {
  const { value, setValue } = useRefState(register!, name, "", overRideValue);
  const getValue = useCallback((): ValueType<Option> => {
    if (value === "") {
      return { value: "", label: "pleaseChoose" } as Option;
    }
    if (!options || options.length === 0) {
      return undefined;
    }
    const option = options.find((option) => option.value === value);

    return option
      ? ({ ...option, label: option?.label || SingleSelect.UNDEFINED_LABEL_TEXT } as Option)
      : ({ value: "", label: SingleSelect.UNDEFINED_LABEL_TEXT } as Option);
  }, [options, value]);

  const usedOptions = useMemo(
    () => options.map((option) => ({ ...option, label: option?.label || SingleSelect.UNDEFINED_LABEL_TEXT } as Option)),
    [options],
  );

  const translateLabel = (option: Option) => option.label;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Select
        id={name}
        placeholder="pleaseChoose"
        instanceId={name}
        name={name}
        value={getValue()}
        onChange={(option: Option) => {
          setValue((option as Option)?.value);
          handleChange && handleChange(option as Option);
        }}
        options={usedOptions}
        noOptionsMessage={() => "noOption"}
        classNamePrefix="react-select"
        className={className + `${errors?.[name]?.message ? " invalid" : ""}`}
        isDisabled={isDisabled}
        closeMenuOnSelect
        formatOptionLabel={translateLabel}
        getOptionLabel={translateLabel}
      />
      {errors?.[name] && <div>{errors?.[name]?.message}</div>}
    </div>
  );
};
SingleSelect.UNDEFINED_LABEL_TEXT = "";

export default SingleSelect;
