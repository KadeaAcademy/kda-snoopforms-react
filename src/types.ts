export interface ClassNames {
  label?: string;
  help?: string;
  element?: string;
  radioOption?: string | ((bag: any) => string) | undefined;
  radioGroup?: string;
  elementLabel?: string;
  button?: string;
}

export interface TextFieldProps {
  name: string;
  label?: string;
  help?: string;
  Icon?: React.ReactNode;
  placeholder?: string;
  classNames: ClassNames;
  required: boolean;
  defaultValue?: string | number;
  rows?: number;
  error?: ElementErrorType | false;
}

export interface Option {
  label: string;
  value: string;
}

export type ElementErrorType = {
  message: string;
};
