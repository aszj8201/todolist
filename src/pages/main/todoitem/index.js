import cx from 'classnames';

function TodoItem({ item, onClickTitle, onClickComplete, onClickDelete, onClickEdit, onClickSpecial }) {
  return (
    <article className={cx('todoItem', { favorite: item.isFavorite }, { complete: item.isComplete })}>
      <div onClick={onClickTitle}>
        <p className="todoTitle">{item.title}</p>
        <time className="createdDate">생성 날짜: {item.createdAT}</time>
      </div>
      <div className="todoitemlist">
        <button type="button" className="specialButton" onClick={onClickSpecial}>
          {item.isFavorite ? '중요 해제' : '중요'}
        </button>
        <button type="button" className="completeButton" onClick={onClickComplete}>
          {item.isComplete ? '완료 해제' : '완료'}
        </button>
        <button type="button" className="editButton" onClick={onClickEdit}>
          수정
        </button>
        <button type="button" className="deleteButton" onClick={onClickDelete}>
          삭제
        </button>
      </div>
    </article>
  );
}

export default TodoItem;
