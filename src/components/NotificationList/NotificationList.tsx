import React, { FC } from 'react';
import Notification from '@components/ui/Notification';
import { NotificationProps } from '@components/ui/Notification/Notification';
import './NotificationList.scss';

interface NotificationListProps {
  notifications: NotificationProps[];
}

const NotificationList: FC<NotificationListProps> = ({ notifications }) => {
  const getColumns = (items: NotificationProps[]) => {
    const columns: any = [];
    const isRow = (idx: number) => idx % 2 === 0;
    let level = 0;

    for (let i = 0; i < items.length; i++) {
      if (isRow(i)) {
        if (i !== 0) {
          level += 1;
        }
        columns.push([]);
      }

      if (columns) {
        columns[level].push(items[i]);
      }
    }

    return columns;
  };

  const columns = getColumns(notifications);

  return (
    <div className="notification-list">
      {columns.map((column: [], idx: number) => (
        <div key={idx} className="notification-list__column">
          {column.map(
            ({ type, message, show }: NotificationProps, idx: number) => (
              <Notification
                key={idx}
                type={type}
                message={message}
                show={show}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
