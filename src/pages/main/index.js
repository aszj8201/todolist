import { useState, useEffect } from 'react';
import { DetailModal, CreateModal, EditModal } from 'component/modals';
import TopInfo from './topInfo';
import TodoItem from './todoitem';
import Empty from './empty';
import './main.css';

function MainPage() {
  const [clickedItem, setClickedItem] = useState(null);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenEditmodal, setisOpenEditmodal] = useState(false);
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem('todoList');
    return savedTodoList ? JSON.parse(savedTodoList) : [];
  });

  const saveTodoListToLocalStorage = (updatedList) => {
    localStorage.setItem('todoList', JSON.stringify(updatedList));
  };

  const onClickTitle = (id) => () => {
    const clickedItem = todoList.find((item) => item.id === id);
    if (!clickedItem) return;
    setClickedItem(clickedItem);
  };

  const onCloseModal = (key) => {
    if (key === 'detail') setClickedItem(null);
    if (key === 'create') setIsOpenCreateModal(false);
    if (key === 'Edit') setisOpenEditmodal(false);
    setClickedItem(null);
  };

  const onClickAdd = () => {
    setIsOpenCreateModal(true);
  };

  const onClickComplete = (id) => () => {
    const updatedList = todoList.map((item) => {
      if (item.id === id) {
        console.log(item.id);
        return { ...item, isComplete: !item.isComplete };
      }
      return item;
    });
    setTodoList(updatedList);
  };

  const onClickDelete = (id) => () => {
    const deletedList = todoList.filter((item) => item.id !== id);
    setTodoList(deletedList);
  };

  const onClickEdit = (selectedItem) => {
    setClickedItem(selectedItem);
    setisOpenEditmodal(true);
  };

  const onClickSpecial = (selectedItem) => {
    const updatedList = todoList.map((item) => {
      if (item.id === selectedItem.id) {
        console.log(item.id);
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    });

    setTodoList(updatedList);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Escape') {
      onCloseModal('detail');
      onCloseModal('create');
      onCloseModal('Edit');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    saveTodoListToLocalStorage(todoList);
  }, [todoList]);

  return (
    <>
      <main>
        <TopInfo onClickAdd={onClickAdd} />
        <section className="todoList">
          {todoList.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              onClickTitle={onClickTitle(item.id)}
              onClickComplete={onClickComplete(item.id)}
              onClickDelete={onClickDelete(item.id)}
              onClickEdit={() => onClickEdit(item)}
              onClickSpecial={() => onClickSpecial(item)}
            />
          ))}
          <Empty view={todoList.length === 0} />
        </section>
      </main>
      <DetailModal isOpen={!!clickedItem} onclose={() => onCloseModal('detail')} item={clickedItem} />
      <CreateModal isOpen={isOpenCreateModal} onclose={() => setIsOpenCreateModal(false)} setTodoList={setTodoList} todoList={todoList} />
      <EditModal isOpen={isOpenEditmodal} onclose={() => onCloseModal('Edit')} setTodoList={setTodoList} clickedItem={clickedItem} onClickEdit={onClickEdit} />
    </>
  );
}

export default MainPage;
