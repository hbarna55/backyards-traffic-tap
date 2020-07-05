import React, { useCallback, useEffect, useRef, useState } from "react";

export const isEmptyObject = (value: any): boolean => (value ? Object.entries(value).length === 0 : true);

const useForm = (values = {}) => {
  const [errors, setErrors] = useState({} as { [key: string]: any });
  const fieldsRef = useRef<FieldRefs<FormValues>>({});
  const [isSubmitting, setSubmitting] = useState(false);
  const isMounted = useRef(true);

  const getFieldValues = (fields: FormValues) => {
    return Object.values(fields).reduce<FormValues>(
      (previous, { ref: { name, value, type } }: Ref) => ({
        ...previous,
        [name]: type === "number" ? Number(value) : value,
      }),
      {} as FormValues,
    );
  };

  const getFieldValueByName = (name: string) => fieldsRef.current[name]?.ref.value;

  const validateFields = useCallback(async (fieldsRef: React.MutableRefObject<FieldRefs<FormValues>>): Promise<any> => {
    const fields = fieldsRef.current;
    let errors: { [key: string]: any } = {};

    Object.keys(fields).forEach((field) => {
      const { name, value } = fields[field]?.ref;
      const { validators } = fields[field] as Field;
      validators &&
        validators.every((validator) => {
          const refValue = validator.refName ? getFieldValueByName(validator.refName) : null;
          const result = validator.callback(value, refValue);
          !result && (errors[name] = validator);
          return result;
        });
    });

    return errors;
  }, []);

  const resetValues = useCallback(() => {
    Object.entries(fieldsRef.current || {}).forEach(([key]) => {
      const ref = fieldsRef.current[key]?.ref;
      return ref?.value && ref?.setValue("");
    });
  }, []);

  const handleSubmit = useCallback(
    (callback: OnSubmit<FormValues>) => async (e: React.BaseSyntheticEvent): Promise<void> => {
      if (e) {
        e.preventDefault();
        e.persist();
      }

      const errors = await validateFields(fieldsRef);
      setErrors(errors);
      if (isEmptyObject(errors)) {
        setSubmitting(true);
        await callback(getFieldValues(fieldsRef.current), resetValues, e);
        if (isMounted.current) {
          setSubmitting(false);
        }
      }
    },
    [validateFields, resetValues],
  );

  useEffect(() => {
    isMounted.current = true;
    Object.entries(values || {}).forEach(([key, value]) => {
      const ref = fieldsRef.current[key]?.ref;
      return !ref?.isOverWritten && ref?.setValue(typeof value === "undefined" || value === null ? "" : value);
    });
    return () => {
      isMounted.current = false;
    };
  }, [values]);

  const register = useCallback((ref: FieldRef, validationOption: Validators = []) => {
    if (!ref) {
      return;
    }
    fieldsRef.current[ref.current.name as FieldName] = {
      ref: ref.current,
      validators: validationOption,
    };
  }, []);

  return { register, handleSubmit, errors, isSubmitting };
};

export default useForm;
