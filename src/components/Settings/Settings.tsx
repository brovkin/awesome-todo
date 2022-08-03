import React, { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Form from '@components/ui/Form';
import FormInput from '@components/ui/FormInput';
import Modal from '@components/ui/Modal';
import Switch from '@components/ui/Switch';
import { savePersonalInfo } from '@features/personalSlice';
import { setSavePositionListMenu } from '@features/settingsSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { getPersonalInfo } from '@selectors/personal';
import { getSettings } from '@selectors/settings';
import { PATTERNS } from '@constants';
import './Settings.scss';

interface SettingsProps {
  isOpen: boolean;
  closeHandler: () => void;
}

const Settings: FC<SettingsProps> = ({ isOpen, closeHandler }) => {
  const { name, surname, email } = useAppSelector(getPersonalInfo);
  const { savePositionListMenu } = useAppSelector(getSettings);
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

        <Switch
          control={control}
          name="savePositionListMenu"
          label="Закрепить меню со списками"
        />
      </Form>
    </Modal>
  );
};

export default Settings;
