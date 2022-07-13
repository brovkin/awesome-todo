import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@components/ui/Button';
import FormInput from '@components/ui/FormInput';
import FormText from '@components/ui/FormText';
import Modal from '@components/ui/Modal';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import sendEmail from '@api/sendEmail';
import './Feedback.scss';

const Feedback: FC<{ isOpen: boolean; closeHandler: () => void }> = ({
  isOpen,
  closeHandler,
}) => {
  const { name, email } = useAppSelector((state) => state.personal?.info);
  const [error, setError] = useState<string>('');

  const dispatch = useAppDispatch();
  const defaultValues = { name, email, message: '' };
  const {
    handleSubmit,
    formState: { isDirty },
    control,
    reset,
  } = useForm({ defaultValues });

  const cancel = () => {
    reset(defaultValues);
    closeHandler();
  };

  const onSubmit = async (data: any) => {
    await sendEmail(data);
    reset(data);
    closeHandler();
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title="Нашел ошибку?">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput control={control} name="name" label="Имя" />

        <FormInput control={control} name="email" label="Email" />

        <FormText
          control={control}
          label="Сообщение"
          name="message"
          className="feedback__form-textarea"
        />

        <div className="feedback__btn-wrapper">
          {isDirty ? (
            <>
              <Button
                className="feedback__btn-cancel"
                type="cancel"
                clickHandler={cancel}
              >
                Отмена
              </Button>
              <Button className="feedback__btn-submit" type="submit">
                Отправить
              </Button>
            </>
          ) : (
            <Button className="feedback__btn-close" clickHandler={closeHandler}>
              Закрыть
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default Feedback;
