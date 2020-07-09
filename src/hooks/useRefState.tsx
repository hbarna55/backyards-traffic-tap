import { useEffect, useRef, useState } from "react";

const useRefState = (
  register: Function,
  name: string,
  initialValue: any,
  overRideValue?: any,
  converter?: (value: any) => void,
) => {
  const [value, setValue] = useState(initialValue);
  const ref = useRef({ name, value, setValue, isOverWritten: false, converter });
  ref.current.value = value;

  useEffect(() => {
    register && register(ref);
  }, [register, ref]);

  useEffect(() => {
    if (typeof overRideValue !== "undefined" && overRideValue !== null) {
      ref.current.isOverWritten = true;
      setValue(overRideValue);
    }
  }, []);

  return { value, setValue, ref };
};
export default useRefState;
