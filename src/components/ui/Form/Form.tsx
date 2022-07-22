import React, { FC } from 'react';
import FormErrors from '@components/Errors/FormErrors';
import Button from '@components/ui/Button';
import isEmpty from '@helpers/isEmpty';
import './Form.scss';

interface FormProps {
  children: JSX.Element | React.ReactNode;
  isDirty: boolean;
  errors: any;
  close: () => void;
  cancel: () => void;
  onSubmit: (data: any) => void;
  submitText?: string;
  text?: string;
}

const Form: FC<FormProps> = ({
  children,
  isDirty,
  errors,
  close,
  cancel,
  onSubmit,
  submitText,
  text,
}) => {
  const hasErrors = !isEmpty(errors);
  return (
    <form onSubmit={onSubmit} className="form">
      <p className="form__text">{text}</p>

      {children}

      <FormErrors errors={errors} />

      <div className="form__btn-wrapper">
        {isDirty ? (
          <>
            <Button
              className="form__btn-cancel cancel"
              type="reset"
              clickHandler={cancel}
            >
              Очистить
            </Button>

            <Button
              className="form__btn-submit"
              type="submit"
              disabled={hasErrors}
            >
              {submitText || 'Изменить'}
            </Button>
          </>
        ) : (
          <Button className="form__btn-close" clickHandler={close}>
            Закрыть
          </Button>
        )}
      </div>
    </form>
  );
};

export default Form;
