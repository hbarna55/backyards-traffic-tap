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
  maxItems?: number;
  overRideValue?: string[];
  handleChange?: (option: Option[]) => void;
};

const MultiSelect = ({
  options,
  label,
  name,
  isDisabled,
  errors,
  className,
  register,
  maxItems,
  overRideValue,
  handleChange,
}: OwnProps) => {
  const { value, setValue } = useRefState(register!, name, [], overRideValue);

  const getValue = useCallback((): ValueType<Option | Option[]> => {
    const option = options ? options.filter((option) => (value || []).indexOf(option.value) >= 0) : ([] as Option[]);
    return option.map((elem) => {
      return { ...elem, label: elem?.label || MultiSelect.UNDEFINED_LABEL_TEXT } as Option;
    });
  }, [options, value]);

  const usedOptions = useMemo(
    () => options.map((option) => ({ ...option, label: option?.label || MultiSelect.UNDEFINED_LABEL_TEXT } as Option)),
    [options],
  );

  const translateLabel = (option: Option) => option.label;

  const onChange = (option: Option | Option[]) => {
    if (Array.isArray(option)) {
      setValue((option as Option[]).map((item: Option) => (item.value !== null ? item.value : item)));
      handleChange &&
        handleChange((option as Option[]).map((item: Option) => (item.value !== null ? item.value : item)) as Option[]);
    } else if (!!option) {
      setValue([...value, option.value]);
      handleChange && handleChange([...value, option.value]);
    } else {
      setValue([]);
      handleChange && handleChange([]);
    }
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Select
        id="react-multiselect"
        placeholder="pleaseChoose"
        instanceId={name}
        name={name}
        value={getValue()}
        onChange={onChange}
        options={value.length >= maxItems! ? [] : usedOptions}
        isMulti
        noOptionsMessage={() => (value.length >= maxItems! ? `max selected items: ${maxItems!}` : "noOption")}
        classNamePrefix="react-select"
        className={className + `${errors?.[name]?.message ? " invalid" : ""}`}
        isDisabled={isDisabled}
        closeMenuOnSelect={false}
        formatOptionLabel={translateLabel}
        getOptionLabel={translateLabel}
      />
      {errors?.[name] && <div>{errors?.[name]?.message}</div>}
    </div>
  );
};
MultiSelect.UNDEFINED_LABEL_TEXT = "null label";

export default MultiSelect;
