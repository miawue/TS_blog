import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

// @ts-ignore
import classes from './field.module.scss';

interface FieldProps {
  htmlTag: string;
  width?: number;
  name: string;
  placeholder?: string;
  type: string;
  register?: UseFormRegisterReturn;
  defaultValue?: string;
  isError?: boolean;
}

const Field = React.forwardRef(
  ({ htmlTag, width, isError, register, type, ...props }: FieldProps, ref) => {
    return React.createElement(htmlTag, {
      style: { width },
      // ref: { register },
      className: isError ? `${classes.input} ${classes.error}` : classes.input,
      type,
      ...register,
      ...props,
    });
  }
);
export default React.memo(Field);
