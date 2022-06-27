import React, { FC } from 'react';
import Icon from '@components/ui/Icon';
import { clearAll } from '@features/todoSlice';
import { useAppDispatch } from '@app/hooks';
import './Info.scss';

const Info: FC = () => {
  const dispatch = useAppDispatch();
  const handleClear = () => dispatch(clearAll(null));
  return (
    <div className="info">
      <div className="info__personal">
        <div className="info__personal-name">Артем</div>
      </div>
      <hr />
      <div className="info__menu">
        <div className="info__menu-item">
          <Icon type="settings" className="info__menu-item-icon" />
          <div className="info__menu-item-title">Настройки</div>
        </div>
        <hr />
        <div className="info__menu-item" onClick={handleClear}>
          <Icon type="broom" className="info__menu-item-icon" />
          <div className="info__menu-item-title">Очистить все</div>
        </div>
      </div>
    </div>
  );
};

export default Info;
