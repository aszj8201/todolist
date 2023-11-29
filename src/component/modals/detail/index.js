import './detailModal.css';
import { IconClose } from 'assets/icons';

function DetailModal({ isOpen, onclose, item }) {
  if (!isOpen) return null;

  return (
    <div className="detailModalWrapper">
      <aside>
        <IconClose width="40px" height="40px" className="closeButton" onClick={onclose} />
        <h1 className="modalTitle">제목</h1>
        <p>{item.title}</p>
        <h1 className="modalTitle">내용</h1>
        <p className="itemContent">{item.content}</p>
        <h1 className="modalTitle">생성 날짜</h1>
        <p>{item.createdAT}</p>
        <h1 className="modalTitle">수정 날짜</h1>
        <p>{item.updatedAT}</p> {/* 수정된 날짜 표시 */}
        <h1 className="modalTitle">중요, 완료 여부</h1>
        <p>
          {item.isFavorite ? '중요' : '안중요'} : {item.isComplete ? '완성' : '미완성'}
        </p>
      </aside>
    </div>
  );
}

export default DetailModal;
