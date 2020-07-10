export const SIMPLE = "SIMPLE";
export const REQUIRED = "REQUIRED";

export const required: Validator = {
  type: REQUIRED,
  message: "Field cannot be empty",
  callback: (selfValue: any): boolean => {
    if (typeof selfValue === "undefined" || selfValue === "" || selfValue === null) {
      return false;
    }
    return !!selfValue.toString().length;
  },
};

export const naturalNumber: Validator = {
  type: SIMPLE,
  message: "",
  callback: (selfValue: string): boolean => {
    const regex = /^\d+$/;
    return regex.test(selfValue);
  },
};
