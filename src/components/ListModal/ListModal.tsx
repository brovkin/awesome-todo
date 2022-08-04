import React, { FC, useContext } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import Form from '@components/ui/Form';
import FormInput from '@components/ui/FormInput';
import Modal from '@components/ui/Modal';
import { TodoList, createList } from '@features/todoSlice';
import { useAppDispatch } from '@app/hooks';
import { RootState } from '@app/store';
import { CreateListContext } from '@context/CreateListContext';
import { NotificationContext } from '@context/NotificationContext';
import isEmpty from '@helpers/isEmpty';
import './ListModal.scss';

const ListModal: FC = () => {
  const { listModal, setListModal } = useContext(
    CreateListContext
  ) as CreateListContext;

  const { showNotification } = useContext(
    NotificationContext
  ) as NotificationContext;

  const defaultValues: FieldValues = { title: '' };
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ mode: 'onChange', defaultValues });

  const allLists = useSelector((state: RootState) => state.todo.lists);

  const allListsTitles = allLists.map((list) => list.title);

  const dispatch = useAppDispatch();

  const cancel = () => {
    reset(defaultValues);
    setListModal(false);
  };

  const onSubmit = (data: FieldValues) => {
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
      showNotification('success', `Список с названием ${title} создан`);
    }
  };

  return (
    <Modal
      isOpen={listModal}
      closeHandler={() => setListModal(false)}
      title="Введите название нового списка"
    >
      <Form
        errors={errors}
        close={() => setListModal(false)}
        cancel={cancel}
        onSubmit={handleSubmit(onSubmit)}
        submitText="Добавить"
      >
        <FormInput
          control={control}
          placeholder="Новый список"
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
      </Form>
    </Modal>
  );
};

export default ListModal;
