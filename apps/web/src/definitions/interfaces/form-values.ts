export interface FormValues {
  [key: string]: string | number | boolean | undefined;
}

export interface LoginFormValues extends FormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues extends FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
