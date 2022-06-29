import React, { FC, InputHTMLAttributes } from 'react';
import { useController } from 'react-hook-form';
import './FormInput.scss';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
}

const FormInput: FC<FormInputProps> = ({ control, name, ...props }) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: '',
  });
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
  );
};

export default FormInput;
