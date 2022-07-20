import React, { FC } from 'react';
import './FormErrors.scss';

export const fields: { [key: string]: string } = {
  name: 'Имя',
  surname: 'Фамилия',
  email: 'E-mail',
  message: 'Сообщение',
  title: 'Название списка',
};

const FormErrors: FC<{ errors: any }> = ({ errors }) => {
  const getMessage = (error: any) => {
    const type = error.type;
    switch (type) {
      case 'required':
        return 'Обязательное поле';
      case 'listAlreadyExists':
        return 'Список с таким названием уже существует';
      case 'pattern':
        return error.message;
      default:
        return '';
    }
  };

  const renderErrors = () => {
    const object = Object.keys(errors);
    if (object.length) {
      return Object.keys(errors).map((key) => {
        if (key) {
          const message = getMessage(errors[key]);
          return (
            <p className="form-errors__error">
              Ошибка в поле {fields[key]} - {message}
            </p>
          );
        }
      });
    }

    return null;
  };

  return <div className="form-errors">{renderErrors()}</div>;
};

export default FormErrors;
