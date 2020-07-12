export const SIMPLE = "SIMPLE";
export const REQUIRED = "REQUIRED";

interface IValidation {
  error: boolean;
  dirty: boolean;
  message: string;
  showMessage: () => void;
  isError: () => boolean;
  validate: (valueToValidate: string) => boolean;
}

abstract class Validation implements IValidation {
  error = true;
  dirty = false;
  abstract message: string;

  isError = (): boolean => {
    return this.dirty && this.error;
  };
  showMessage = (): string => {
    return this.isError() ? this.message : "";
  };
  abstract validate: (valueToValidate: string) => boolean;
}

export class Required extends Validation {
  message = "Field cannot be empty.";

  validate = (valueToValidate: string): boolean => {
    this.dirty = true;
    if (typeof valueToValidate === "undefined" || valueToValidate === "" || valueToValidate === null) {
      this.error = false;
    }
    this.error = valueToValidate.toString().length < 1;
    return this.isError();
  };
}
