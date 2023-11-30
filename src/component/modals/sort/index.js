import React from 'react';
import { IconClose } from 'assets/icons';
import './sortModal.css';

const SortModal = ({ todoList, setTodoList, onClose }) => {
  const sortBy = (sortFunction) => {
    const sortedList = [...todoList].sort(sortFunction);
    console.log('dnosndo');
    setTodoList(sortedList);
    onClose(); // 모달을 닫습니다.
  };

  return (
    <div className="createModalWrapper">
      <aside>
        <IconClose width="40px" height="40px" className="closeButton" onClick={onClose} />
        <h1 className="modalTitle">정렬기준</h1>
        <div className="sortingOptions">
          <p onClick={() => sortBy((a, b) => a.name.localeCompare(b.name, 'ko-KR'))}>한글순</p>
          <p onClick={() => sortBy((a, b) => b.name.localeCompare(a.name, 'ko-KR'))}>한글역순</p>
          <p onClick={() => sortBy((a, b) => new Date(a.createdAt) - new Date(b.createdAt))}>생성순</p>
          <p onClick={() => sortBy((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}>생성역순</p>
        </div>
      </aside>
    </div>
  );
};

export default SortModal;
