import React, { FC, InputHTMLAttributes } from 'react';
import { useController } from 'react-hook-form';
import './FormInput.scss';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  rules?: any;
  defaultValue?: string;
  label: string;
}

const FormInput: FC<FormInputProps> = ({
  control,
  name,
  label,
  rules,
  defaultValue,
  ...props
}) => {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    rules,
    defaultValue: defaultValue || '',
  });
  return (
    <div className="form-item">
      {label ? <div className="form-item__title">{label}</div> : null}
      <div className="form-item__value-wrapper">
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="form-item__value-input"
          {...props}
        />
      </div>
    </div>
  );
};

export default FormInput;
