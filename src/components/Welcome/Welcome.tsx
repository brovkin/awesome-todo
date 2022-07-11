import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@components/ui/Button';
import FormInput from '@components/ui/FormInput';
import Modal from '@components/ui/Modal';
import { PersonalInfo, savePersonalInfo } from '@features/personalSlice';
import { setAuth } from '@features/settingsSlice';
import { useAppDispatch } from '@app/hooks';
import './Welcome.scss';

const Welcome: FC = () => {
  const defaultValues = { name: '', surname: '', email: '' };
  const {
    handleSubmit,
    formState: { isDirty, isValid },
    control,
    reset,
  } = useForm({ mode: 'onChange', defaultValues });

  const dispatch = useAppDispatch();

  const cancel = () => {
    reset(defaultValues);
  };

  const onSubmit = (data: PersonalInfo) => {
    const { name, surname, email } = data;
    if (isValid) {
      dispatch(savePersonalInfo({ name, surname, email }));
      dispatch(setAuth(true));
      reset(data);
    }
  };

  return (
    <div className="welcome">
      <Modal title="Добро пожаловать! Вы в первый раз?" isOpen={true}>
        <p>Заполните Вашу персональную информацию</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            control={control}
            label="Имя"
            name="name"
            rules={{ required: true }}
          />
          <FormInput
            control={control}
            label="Фамилия"
            name="surname"
            rules={{ required: true }}
          />
          <FormInput
            control={control}
            label="Email"
            name="email"
            rules={{
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            }}
          />

          <div className="welcome__btn-wrapper">
            {isDirty ? (
              <>
                <Button
                  className="welcome__btn-cancel"
                  type="cancel"
                  clickHandler={cancel}
                >
                  Очистить
                </Button>

                <Button
                  className="welcome__btn-submit"
                  type="submit"
                  disabled={!isValid}
                >
                  Начать
                </Button>
              </>
            ) : (
              <Button
                className="settings__btn-close"
                clickHandler={() => window.location.reload()}
              >
                Закрыть
              </Button>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Welcome;
