import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@components/ui/Button';
import FormInput from '@components/ui/FormInput';
import Modal from '@components/ui/Modal';
import Switch from '@components/ui/Switch';
import { savePersonalInfo } from '@features/personalSlice';
import { setSavePositionListMenu } from '@features/settingsSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import './Settings.scss';

interface SettingsProps {
  isOpen: boolean;
  closeHandler: () => void;
}

const onError = (type: any) => {
  switch (type) {
    case 'required':
      return 'Обязательное поле';
    default:
      return '';
  }
};

const Settings: FC<SettingsProps> = ({ isOpen, closeHandler }) => {
  const { name, surname } = useAppSelector((state) => state.personal.info);
  const { savePositionListMenu } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const defaultValues = { name, surname, savePositionListMenu };
  const {
    handleSubmit,
    formState: { isDirty },
    control,
    reset,
    register,
  } = useForm({ defaultValues });

  const cancel = () => {
    reset(defaultValues);
    closeHandler();
  };

  const onSubmit = (data: any) => {
    const { name, surname, savePositionListMenu } = data;
    dispatch(savePersonalInfo({ name, surname }));
    dispatch(setSavePositionListMenu(savePositionListMenu));
    reset(data);
    closeHandler();
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title="Настройки">
      <form onSubmit={handleSubmit(onSubmit)} className="settings">
        <p>Информация</p>

        <FormInput control={control} label="Имя" name="name" />

        <FormInput control={control} label="Фамилия" name="surname" />

        <Switch
          control={control}
          name="savePositionListMenu"
          label="Закрепить меню со списками"
        />

        <div className="settings__btn-wrapper">
          {isDirty ? (
            <>
              <Button
                className="settings__btn-cancel"
                type="cancel"
                clickHandler={cancel}
              >
                Отмена
              </Button>
              <Button className="settings__btn-submit" type="submit">
                Изменить
              </Button>
            </>
          ) : (
            <Button className="settings__btn-close" clickHandler={closeHandler}>
              Закрыть
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default Settings;
