import React, { FC, useContext } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Form from '@components/ui/Form';
import FormInput from '@components/ui/FormInput';
import Modal from '@components/ui/Modal';
import Switch from '@components/ui/Switch';
import { savePersonalInfo } from '@features/personalSlice';
import { setSavePositionListMenu } from '@features/settingsSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import useMedia from '@hooks/useMedia';
import { NotificationContext } from '@context/NotificationContext';
import { getPersonalInfo } from '@selectors/personal';
import { getSettings } from '@selectors/settings';
import { MEDIA_QUERIES, PATTERNS } from '@constants';
import './Settings.scss';

interface SettingsProps {
  isOpen: boolean;
  closeHandler: () => void;
}

const Settings: FC<SettingsProps> = ({ isOpen, closeHandler }) => {
  const { name, surname, email } = useAppSelector(getPersonalInfo);
  const { savePositionListMenu } = useAppSelector(getSettings);
  const isMediaMD = useMedia(MEDIA_QUERIES.md);
  const dispatch = useAppDispatch();
  const defaultValues: FieldValues = {
    name,
    surname,
    email,
    savePositionListMenu,
  };
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
    closeHandler();
  };

  const onSubmit = (data: FieldValues) => {
    const { name, surname, email, savePositionListMenu } = data;
    dispatch(savePersonalInfo({ name, surname, email }));
    dispatch(setSavePositionListMenu(savePositionListMenu));
    reset(data);
    closeHandler();
    showNotification('success', 'Настройки успешно изменены');
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title="Настройки">
      <Form
        errors={errors}
        close={closeHandler}
        cancel={cancel}
        onSubmit={handleSubmit(onSubmit)}
        submitText="Изменить"
        text="Информация"
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
          label="Email"
          name="email"
          rules={{
            required: true,
            pattern: PATTERNS.email,
          }}
        />

        {!isMediaMD ? (
          <Switch
            control={control}
            name="savePositionListMenu"
            label="Закрепить меню со списками"
          />
        ) : null}
      </Form>
    </Modal>
  );
};

export default Settings;
