import React, { FC } from 'react';
import Info from './Info';
import './Notification.scss';
import cn from 'classnames';

interface NotificationProps {
  type: 'info' | 'error';
  text: string;
}

const Notification: FC<NotificationProps> = ({ type, text }) => {
  return (
    <div className={cn('notification', type)}>
      {type === 'info' && <Info text={text} />}
      {type === 'error' && 'error'}
    </div>
  );
};

export default Notification;
