import React from 'react';

// @ts-ignore
import classes from './button.module.scss';

interface ButtonProps {
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  design?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  form?: string;
  ref?: any;
}

const Button: React.FC<ButtonProps> = React.forwardRef(
  ({ type = 'button', children, design, ...props }, ref) => {
    return (
      <button
        {...props}
        //@ts-ignore
        ref={ref}
        className={`${classes.btn} ${classes[design || '']}`}
        type={type}
      >
        {children}
      </button>
    );
  }
);

export default Button;
