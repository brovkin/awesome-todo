import React, { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import FormErrors from '@components/Errors/FormErrors';
import Button from '@components/ui/Button';
import FormInput from '@components/ui/FormInput';
import Modal from '@components/ui/Modal';
import { TodoList, createList } from '@features/todoSlice';
import { useAppDispatch } from '@app/hooks';
import { RootState } from '@app/store';
import { CreateListContext } from '@context/CreateListContext';
import isEmpty from '@helpers/isEmpty';
import './ListModal.scss';

const ListModal: FC = () => {
  const { listModal, setListModal } = useContext(
    CreateListContext
  ) as CreateListContext;

  const defaultValues = { title: 'Новый список' };
  const {
    handleSubmit,
    formState: { isDirty, isValid, errors },
    control,
    reset,
  } = useForm({ mode: 'onChange', defaultValues });

  const allLists = useSelector((state: RootState) => state.todo.lists);

  const allListsTitles = allLists.map((list) => list.title);

  const isDefaultValueExists = allListsTitles.includes(defaultValues.title);

  const dispatch = useAppDispatch();

  const cancel = () => {
    reset(defaultValues);
    setListModal(false);
  };

  const onSubmit = (data: any) => {
    const { title } = data;

    if (isEmpty(errors)) {
      const newList: TodoList = {
        id: uuid(),
        title,
        todos: [],
        // if lists haven't exist
        active: allLists.length === 0,
      };

      dispatch(createList(newList));
      setListModal(false);
    }
  };
  return (
    <Modal
      isOpen={listModal}
      closeHandler={() => setListModal(false)}
      title="Введите название нового списка"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="list-modal__form">
        <FormInput
          control={control}
          label="Название списка"
          name="title"
          rules={{
            required: true,
            validate: {
              listAlreadyExists: (value: string) =>
                !allListsTitles.includes(value),
            },
          }}
          autoFocus
        />

        <FormErrors errors={errors} />

        <div className="list-modal__btn-wrapper">
          {isDirty || !isDefaultValueExists ? (
            <>
              <Button
                className="list-modal__btn-cancel"
                type="cancel"
                clickHandler={cancel}
              >
                Отмена
              </Button>
              <Button
                className="list-modal__btn-submit"
                type="submit"
                disabled={!isEmpty(errors)}
              >
                Добавить
              </Button>
            </>
          ) : (
            <Button
              className="list-modal__btn-close"
              clickHandler={() => setListModal(false)}
            >
              Закрыть
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default ListModal;
