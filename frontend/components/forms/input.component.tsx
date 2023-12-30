import { FormHelperText, TextField } from '@mui/material';
import React from 'react';

type Props = {
  id?: string;
  label: string;
  name: string;
  type: string;
  value?: string;
  InputProps?: any;
  className?: any;
  errors?: any;
  onChange?: any;
  isError?: boolean | undefined;
};

const InputField: React.FC<Props> = ({
  id,
  name,
  type,
  label,
  InputProps,
  errors,
  isError,
  value,
  className,
  onChange
}) => {
  return (
    <div className={`flex flex-col pt-4 ${className}`}>
      <TextField
        id={id}
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        variant="standard"
        autoComplete="off"
        sx={{
          '&.:after': {
            borderBottom: '2px solid yellow' // Set the color for ::after pseudo-conso
          },
          ...(isError
            ? {
                borderBottom: '2px solid red'
              }
            : {})
        }}
        InputProps={InputProps}
        InputLabelProps={{
          style: {
            color: isError == true ? 'red' : 'inherit'
          }
        }}
      />

      {errors && errors.type == 'required' ? (
        <FormHelperText>
          <p className="text-red-600">
            <span className="capitalize mr-1">{label as any}</span> is required
          </p>
        </FormHelperText>
      ) : null}
      {errors && errors.type == 'pattern' ? (
        <FormHelperText>
          <p className="text-red-600">
            <span className="capitalize mr-2">{errors.message}</span>
          </p>
        </FormHelperText>
      ) : null}
      {errors && errors.type == 'validate' ? (
        <FormHelperText>
          <p className="text-red-600">
            <span className="capitalize mr-2">{errors.message}</span>
          </p>
        </FormHelperText>
      ) : null}
    </div>
  );
};

export default InputField;
