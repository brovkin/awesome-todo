import React, { FC } from 'react';
import Icon from '@components/ui/Icon';
import { clearAll } from '@features/todoSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import './Info.scss';

interface InfoProps {
  openSettingsModal: () => void;
  openFeedbackModal: () => void;
  setRightMenu: (state: boolean) => void;
}

const Info: FC<InfoProps> = ({
  openSettingsModal,
  openFeedbackModal,
  setRightMenu,
}) => {
  const dispatch = useAppDispatch();
  const { name, surname, email } = useAppSelector(
    (state) => state.personal.info
  );
  const handleClear = () => {
    dispatch(clearAll(null));
    setRightMenu(false);
    window.location.reload();
  };

  return (
    <>
      <div className="info">
        <div className="info__personal">
          <div className="info__personal-name">
            {surname} {name}
          </div>
          <a href={`mailto:${email}`} className="info__personal-email">
            {email}
          </a>
        </div>
        <hr />
        <div className="info__menu">
          <div className="info__menu-item" onClick={openSettingsModal}>
            <Icon type="settings" className="info__menu-item-icon" />
            <div className="info__menu-item-title">Настройки</div>
          </div>
          <hr />
          <div className="info__menu-item" onClick={openFeedbackModal}>
            <Icon type="bug" className="info__menu-item-icon" />
            <div className="info__menu-item-title">Ошибка?</div>
          </div>
          <div className="info__menu-item" onClick={handleClear}>
            <Icon type="broom" className="info__menu-item-icon" />
            <div className="info__menu-item-title">Очистить все</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
