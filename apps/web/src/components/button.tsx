import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';

export const enum ButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  CUSTOM = 'custom',
}

export const enum ButtonSizes {
  SMALL = 'small',
  CUSTOM = 'custom',
}

export interface ButtonBaseProps
  extends PropsWithChildren<
      DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    >,
    VariantProps<typeof buttonBase> {
  loading?: boolean;
}

const Button = (props: ButtonBaseProps) => {
  return (
    <button
      onClick={props.onClick}
      className={buttonBase({
        variant: props.variant,
        isDisabled: props.isDisabled || props.loading || props.disabled,
        className: props.className,
      })}
      disabled={props.isDisabled || props.loading || props.disabled}
    >
      {props.loading ? 'Loading...' : props.children}
    </button>
  );
};

export const buttonBase = cva(
  ['py-2', 'px-4', 'rounded', 'font-bold', 'transition', 'ease-in', 'capitalize'],
  {
    variants: {
      variant: {
        [ButtonVariants.PRIMARY]: ['bg-primary', 'hover:bg-primary/70', 'text-white'],
        [ButtonVariants.CUSTOM]: [],
      },
      size: {
        [ButtonSizes.SMALL]: ['min-w-[100px]'],
        [ButtonSizes.CUSTOM]: [],
      },
      isDisabled: {
        true: ['opacity-50 bg-slate-500 hover:bg-slate-400 cursor-not-allowed'],
      },
    },
    defaultVariants: {
      variant: ButtonVariants.PRIMARY,
      size: ButtonSizes.SMALL,
      isDisabled: false,
    },
  }
);

export default Button;
