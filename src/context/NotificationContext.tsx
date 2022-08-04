import React, { FC, createContext, useState } from 'react';
import NotificationList from '@components/NotificationList';
import {
  NotificationProps,
  NotificationType,
} from '@components/ui/Notification/Notification';

interface NotificationProvider {
  children: JSX.Element | React.ReactNode;
}

interface NotificationContext {
  showNotification: (type: NotificationType, message: string) => void;
}

const NotificationContext = createContext<NotificationContext | null>(null);

const NotificationProvider: FC<NotificationProvider> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const showNotification = (type: NotificationType, message: string) => {
    setNotifications((prev) => [...prev, { type, message, show: true }]);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <NotificationList notifications={notifications} />
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
