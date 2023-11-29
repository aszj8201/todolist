import { useState, useEffect } from 'react';
import './createModal.css';
import { IconClose } from 'assets/icons';
import dayjs from 'dayjs';
import { generateID } from 'utils';

dayjs.locale('ko');

const TIVAL_VALUE = {
  title: '',
  content: '',
};

const CreateModal = ({ isOpen, onclose, setTodoList, todoList }) => {
  const [value, setvalue] = useState(TIVAL_VALUE);
  const [clickedItem, setClickedItem] = useState(null);

  useEffect(() => {
    if (clickedItem) {
      setvalue({
        title: clickedItem.title,
        content: clickedItem.content,
      });
    }
  }, [clickedItem]);

  const onChange = (e) => {
    // input 값 변경 시 호출되는 함수
    const { name, value } = e.currentTarget;
    setvalue((prev) => ({ ...prev, [name]: value }));
  };

  const onCreate = (e) => {
    e.preventDefault();

    if (!value.title || !value.content) return;

    if (clickedItem) {
      const updatedList = todoList.map((item) => {
        if (item.id === clickedItem.id) {
          return {
            ...item,
            title: value.title,
            content: value.content,
            updatedAt: dayjs().format('YYYY.MM.DD HH:mm'),
          };
        }
        return item;
      });
      setTodoList(updatedList);
      setClickedItem(null);
    } else {
      const newItem = {
        id: generateID(todoList), // 수정된 generateID 함수 사용
        ...value,
        createdAT: dayjs().format('YYYY.MM.DD HH:mm'),
        isComplete: false,
      };

      setTodoList((prev) => [...prev, newItem]);
    }

    onclose();
    setvalue(TIVAL_VALUE);
  };

  if (!isOpen) return null; // isOpen이 false일 때는 모달 렌더링하지 않음

  return (
    <div className="createModalWrapper">
      <aside>
        <IconClose width="40px" height="40px" className="closeButton" onClick={onclose} />
        <form onSubmit={onCreate}>
          <h1 className="modalTitle">제목</h1>
          <input type="text" placeholder="제목을 입력해주세요" name="title" value={value.title} onChange={onChange} />
          <h1 className="modalTitle">내용</h1>
          <textarea placeholder="내용을 입력해주세요." rows={12} name="content" value={value.content} onChange={onChange} />
          <button type="submit">{clickedItem ? '수정' : '생성'}</button>
        </form>
      </aside>
    </div>
  );
};

export default CreateModal; // CreateModal 컴포넌트를 내보냅니다.
