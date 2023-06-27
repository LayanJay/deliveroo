import { VariantProps, cva, cx } from 'class-variance-authority';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

export interface InputBaseProps
  extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'>,
    VariantProps<typeof inputBase> {
  label?: string;
  name: string;
  wrapperClassName?: string;
  type?: 'text' | 'email' | 'password';
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  helpText?: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
}

const Input = (props: InputBaseProps) => {
  const {
    label,
    wrapperClassName,
    isDisabled,
    className,
    error,
    register,
    registerOptions,
    helpText,
    ...rest
  } = props;
  return (
    <fieldset className={cx(wrapperClassName, `relative w-full`)}>
      {!!label ? (
        <label
          htmlFor={props.name}
          className={`block mb-1 ${!!error ? 'text-red-500' : 'text-slate-800'}`}
        >
          {label}
        </label>
      ) : null}
      <input
        id={props.name}
        className={inputBase({
          isDisabled: props.disabled || isDisabled,
          variant: error ? 'error' : 'default',
          className: className,
        })}
        placeholder={props.placeholder || label}
        disabled={isDisabled ?? props.disabled}
        {...register(props.name, registerOptions)}
        {...rest}
      />
      {!!helpText && !error && <p className='text-gray-200/50 text-xs mt-1'>{helpText}</p>}
      {error && <p className='absolute right-0 text-red-500 text-xs mt-1'>{error as string}</p>}
    </fieldset>
  );
};

export default Input;

export const inputBase = cva(
  [`text-sm border rounded-lg block w-full p-2.5 outline-none transition ease-in`],
  {
    variants: {
      variant: {
        default: [
          'text-slate-600 border-slate-200 focus:border-primary placeholder:text-slate-400',
        ],
        error: [
          'text-red-500 border-red-500/50 focus:border-red-500/60 placeholder:text-red-500/70',
        ],
      },
      isDisabled: {
        true: ['opacity-70 cursor-not-allowed'],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
