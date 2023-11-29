import { useState, useEffect } from 'react';
import './editModal.css';
import { IconClose } from 'assets/icons';
import dayjs from 'dayjs';

dayjs.locale('ko');

const TIVAL_VALUE = {
  title: '',
  content: '',
};

// EditModal 컴포넌트 정의
const EditModal = ({ isOpen, onclose, setTodoList, clickedItem }) => {
  const [value, setValue] = useState(clickedItem || TIVAL_VALUE);

  // useEffect 훅을 이용하여 부수 효과 처리
  useEffect(() => {
    if (clickedItem) {
      setValue({
        title: clickedItem.title,
        content: clickedItem.content,
        updatedAt: clickedItem.updatedAt || dayjs().format('YYYY.MM.DD HH:mm'), // 수정된 날짜 설정
      });
    }
  }, [clickedItem]);

  // input 값 변경 시 호출되는 함수
  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  // 수정 버튼 클릭 시 호출되는 함수
  const onEdit = (e) => {
    e.preventDefault();

    if (!value.title || !value.content) return; // 제목 또는 내용이 비어있으면 함수 종료

    const updatedItem = {
      ...clickedItem,
      title: value.title,
      content: value.content,
      updatedAt: dayjs().format('YYYY.MM.DD HH:mm'),
    };

    // TodoList를 업데이트하는 함수
    const updatedList = setTodoList((prev) => prev.map((item) => (item.id === clickedItem.id ? updatedItem : item)));

    onclose();
    setValue(TIVAL_VALUE);
  };

  if (!isOpen || !clickedItem) return null; // isOpen이 false이거나 clickedItem이 없을 때는 모달 렌더링하지 않음

  return (
    <div className="editModalWrapper">
      <aside>
        <IconClose width="40px" height="40px" className="closeButton" onClick={onclose} />
        <form onSubmit={onEdit}>
          <h1 className="modalTitle">제목</h1>
          <input type="text" placeholder="제목을 입력해주세요" name="title" value={value.title} onChange={onChange} />
          <h1 className="modalTitle">내용</h1>
          <textarea placeholder="내용을 입력해주세요." rows={12} name="content" value={value.content} onChange={onChange} />
          <button type="submit">수정</button>
        </form>
      </aside>
    </div>
  );
};

export default EditModal; // EditModal 컴포넌트를 내보냅니다.
