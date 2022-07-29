import React, { FC } from 'react';
import FormErrors from '@components/Errors/FormErrors';
import Button from '@components/ui/Button';
import isEmpty from '@helpers/isEmpty';
import { APP_URL } from '@constants';
import './Form.scss';

interface FormProps {
  children: JSX.Element | React.ReactNode;
  isDirty: boolean;
  errors: any;
  close: () => void;
  cancel: () => void;
  onSubmit: (data: any) => void;
  submitText?: string;
  showPrivacyPolicy?: boolean;
  text?: string;
}

const Form: FC<FormProps> = ({
  children,
  isDirty,
  errors,
  close,
  cancel,
  onSubmit,
  submitText = 'Изменить',
  text,
  showPrivacyPolicy = false,
}) => {
  const hasErrors = !isEmpty(errors);
  return (
    <form onSubmit={onSubmit} className="form">
      <p className="form__text">{text}</p>

      {children}

      <FormErrors errors={errors} />

      {showPrivacyPolicy && isDirty ? (
        <div className="form__privacy-policy">
          Нажимая на кнопку «{submitText}», я даю&nbsp;
          <a
            href={`${APP_URL}/privacy-policy`}
            target="_blank"
            rel="noreferrer"
          >
            согласие на обработку персональных данных
          </a>
        </div>
      ) : null}

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
              {submitText}
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
