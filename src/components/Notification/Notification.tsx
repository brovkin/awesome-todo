import React, { FC } from 'react';
import cn from 'classnames';
import './Notification.scss';

export const INTERFACE_ERRORS = {
  listAlreadyExists: 'Лист с таким названием уже существует',
};

interface NotificationProps {
  type: 'info' | 'error';
  text: string;
}

const Notification: FC<NotificationProps> = ({ type, text }) => {
  return <div className={cn('notification', type)}>{text}</div>;
};

export default Notification;
