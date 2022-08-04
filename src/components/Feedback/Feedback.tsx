import React, { FC, useContext } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Form from '@components/ui/Form';
import FormInput from '@components/ui/FormInput';
import FormText from '@components/ui/FormText';
import Modal from '@components/ui/Modal';
import { useAppSelector } from '@app/hooks';
import sendEmail from '@api/sendEmail';
import { NotificationContext } from '@context/NotificationContext';
import { getPersonalInfo } from '@selectors/personal';
import { PATTERNS } from '@constants';
import './Feedback.scss';

const Feedback: FC<{ isOpen: boolean; closeHandler: () => void }> = ({
  isOpen,
  closeHandler,
}) => {
  const { name, email } = useAppSelector(getPersonalInfo);
  const defaultValues: FieldValues = { name, email, message: '' };
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ mode: 'onChange', defaultValues });

  const { showNotification } = useContext(
    NotificationContext
  ) as NotificationContext;

  const cancel = () => {
    reset(defaultValues);
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      await sendEmail(data);
      reset(data);
      closeHandler();
      showNotification('success', 'Форма отправлена. Спасибо!');
    } catch (e) {
      showNotification(
        'error',
        'К сожалению не удалось отправить форму. Попробуйте позже. '
      );
    }
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title="Нашел ошибку?">
      <Form
        errors={errors}
        close={closeHandler}
        cancel={cancel}
        onSubmit={handleSubmit(onSubmit)}
        submitText="Отправить"
        text="Вы можете написать и рассказать нам что Вам понравилось, а может даже
          и не понравилось, это поможет улучшить наше приложение. Спасибо!"
        showPrivacyPolicy
      >
        <FormInput
          control={control}
          name="name"
          label="Имя"
          rules={{ required: true }}
        />

        <FormInput
          control={control}
          label="Email"
          name="email"
          rules={{
            required: true,
            pattern: PATTERNS.email,
          }}
        />

        <FormText
          control={control}
          label="Сообщение"
          name="message"
          className="feedback__form-textarea"
          rules={{ required: true }}
        />
      </Form>
    </Modal>
  );
};

export default Feedback;
