import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Button from '@components/ui/Button';
import Tooltip from '@components/ui/Tooltip';
import { changeListTitle } from '@features/todoSlice';
import { useAppDispatch } from '@app/hooks';
import { NotificationContext } from '@context/NotificationContext';
import './Title.scss';

interface TitleProps {
  listId: string;
  title: string;
}

const Title: FC<TitleProps> = ({ listId, title }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>('');
  const ref = useRef<HTMLInputElement | null>(null);

  const { showNotification } = useContext(
    NotificationContext
  ) as NotificationContext;

  const dispatch = useAppDispatch();

  useEffect(() => {
    setEditTitle(title);
    if (ref.current) {
      ref.current.select();
    }
  }, [edit]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;

    if (key === 'Enter') {
      handleSaveListTitle();
    }
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setEditTitle(value);
  };

  const handleSaveListTitle = () => {
    if (editTitle.length) {
      dispatch(changeListTitle({ id: listId, value: editTitle }));
      setEdit(false);
    } else {
      showNotification('error', 'Введите название списка');
    }
  };

  return (
    <div className="list-title">
      {edit ? (
        <div className="list-title__edit">
          <input
            ref={ref}
            className="list-title__edit-title"
            value={editTitle}
            onChange={handleChangeTitle}
            onKeyDown={handleKeyDown}
          />
          <div className="list-title__edit-btn-wrapper">
            <Button
              className="list-title__edit-btn-save"
              size="sm"
              clickHandler={handleSaveListTitle}
            >
              Сохранить
            </Button>
            <Button
              mode="outline"
              size="sm"
              clickHandler={() => setEdit(false)}
            >
              Отмена
            </Button>
          </div>
        </div>
      ) : (
        <h3 className="list-title__title-wrapper" onClick={() => setEdit(true)}>
          <span className="list-title__title">{title}</span>
        </h3>
      )}
    </div>
  );
};

export default Title;
