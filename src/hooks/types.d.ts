declare type Messages = {
  [key: string]: any;
};

declare type ElementLike = {
  name: string;
  value: string | srting[];
  setValue: (newValue: string | srting[]) => void;
};

declare type FieldRef = {
  current: ElementLike;
};

declare type FormValues = Record<string, any>;

type BaseFieldName = Extract<keyof FormValues, string>;

declare type FieldName = BaseFieldName | string;

declare type FieldValue = FormValues[FieldName];

declare type Ref = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | any;

declare type OnSubmit<FormValues> = (
  data: FormValues,
  resetValues: () => void,
  event: React.BaseSyntheticEvent,
) => void | Promise<void>;

declare type ValidatorType = REQUIRED | SIMPLE;

declare type Validator = {
  type: ValidatorType;
  refName?: string;
  message: string;
  callback: (selfValue: string, refValue?: string) => boolean;
};

declare type Validators = Array<Validator>;

declare type Field = {
  ref: Ref;
  validators?: Validators;
  type?: string;
};

declare type FieldRefs<FormValues> = Partial<Record<FieldName<FormValues>, Field>>;

declare type HandleChange = ({ type, target }: MouseEvent) => Promise<void | boolean>;

declare type Option = {
  label: string;
  value: string | number | boolean;
};
