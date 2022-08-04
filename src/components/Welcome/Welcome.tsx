import React, { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Form from '@components/ui/Form';
import FormInput from '@components/ui/FormInput';
import Modal from '@components/ui/Modal';
import { savePersonalInfo } from '@features/personalSlice';
import { setAuth } from '@features/settingsSlice';
import { useAppDispatch } from '@app/hooks';
import { PATTERNS } from '@constants';
import './Welcome.scss';

const Welcome: FC = () => {
  const defaultValues: FieldValues = { name: '', surname: '', email: '' };
  const {
    handleSubmit,
    formState: { isValid, errors },
    control,
    reset,
  } = useForm({ mode: 'onChange', defaultValues });

  const dispatch = useAppDispatch();

  const cancel = () => {
    reset(defaultValues);
  };

  const onSubmit = (data: FieldValues) => {
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
        <Form
          errors={errors}
          close={() => window.location.reload()}
          cancel={cancel}
          onSubmit={handleSubmit(onSubmit)}
          submitText="Начать"
          text="Заполните Вашу персональную информацию"
          showPrivacyPolicy
        >
          <FormInput
            control={control}
            label="Имя"
            name="name"
            rules={{ required: true }}
          />
          <FormInput control={control} label="Фамилия" name="surname" />
          <FormInput
            control={control}
            label="E-mail"
            name="email"
            rules={{
              required: true,
              pattern: PATTERNS.email,
            }}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default Welcome;
