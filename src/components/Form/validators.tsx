export const SIMPLE = "SIMPLE";
export const REQUIRED = "REQUIRED";

export const required: Validator = {
  type: REQUIRED,
  messageKey: "required",
  callback: (selfValue: any): boolean => {
    if (typeof selfValue === "undefined" || selfValue === "" || selfValue === null) {
      return false;
    }
    return !!selfValue.toString().length;
  },
};