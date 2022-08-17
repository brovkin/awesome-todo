import React, { FC, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import Icon from '@components/ui/Icon';
import './Notification.scss';

export type NotificationType = 'success' | 'delete' | 'error' | null;

export interface NotificationProps {
  message: string;
  type: NotificationType;
  show: boolean;
}

const Notification: FC<NotificationProps> = ({ type, message, show }) => {
  const [showNote, setShowNote] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setShowNote(show);

    setTimeout(() => {
      setShowNote(false);
    }, 2500);
  }, [show]);

  return (
    <CSSTransition
      in={showNote}
      timeout={0}
      classNames="notification-animation"
    >
      <div ref={ref} className={cn('ui-notification', type)}>
        {type === 'success' ? (
          <Icon className="ui-notification__icon" type="tick" />
        ) : null}
        {type === 'delete' ? (
          <Icon className="ui-notification__icon" type="delete" />
        ) : null}
        {type === 'error' ? (
          <Icon className="ui-notification__icon" type="cancel" />
        ) : null}
        <div className="ui-notification__message">{message}</div>
      </div>
    </CSSTransition>
  );
};

export default Notification;
