import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@components/ui/Button';
import FormInput from '@components/ui/FormInput';
import Modal from '@components/ui/Modal';
import { savePersonalInfo } from '@features/personalSlice';
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
  const dispatch = useAppDispatch();
  const defaultValues = { name, surname };
  const {
    handleSubmit,
    formState: { errors, isDirty },
    control,
    reset,
  } = useForm({ defaultValues });

  const cancel = () => {
    reset(defaultValues);
    closeHandler();
  };

  const onSubmit = (data: any) => {
    dispatch(savePersonalInfo(data));
    closeHandler();
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title="Настройки">
      <form onSubmit={handleSubmit(onSubmit)} className="settings">
        <p>Информация</p>

        <div className="settings__item">
          <div className="settings__item-title">Имя</div>
          <div className="settings__item-value-wrapper">
            <FormInput
              control={control}
              className="settings__item-value-edit"
              name="name"
            />
          </div>
        </div>

        <div className="settings__item">
          <div className="settings__item-title">Фамилия</div>
          <div className="settings__item-value-wrapper">
            <FormInput
              control={control}
              className="settings__item-value-edit"
              name="surname"
            />
          </div>
        </div>

        {/*<div className="settings__item">*/}
        {/*  <div className="settings__item-title">Боковое меню со списками</div>*/}
        {/*  <div className="settings__item-value">*/}
        {/*    Свитч*/}
        {/*    <input type="checkbox" />*/}
        {/*  </div>*/}
        {/*</div>*/}

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
