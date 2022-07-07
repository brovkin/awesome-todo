import React, { FC, InputHTMLAttributes } from 'react';
import { useController } from 'react-hook-form';
import './FormInput.scss';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  label: string;
}

const FormInput: FC<FormInputProps> = ({ control, name, label, ...props }) => {
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
    <div className="form-item__item">
      {label ? <div className="form-item__item-title">{label}</div> : null}
      <div className="form-item__item-value-wrapper">
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="form-item__item-value-input"
          {...props}
        />
      </div>
    </div>
  );
};

export default FormInput;
