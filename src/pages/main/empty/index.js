function Empty({ view }) {
  if (!view) return null;
  return <span className="emptyText">추가해주세요</span>;
}

export default Empty;
