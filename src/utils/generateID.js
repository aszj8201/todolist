export const generateID = (existingItems) => {
  const existingIDs = existingItems.map((item) => item.id);
  let newID = '';
  do {
    newID = Math.floor(Math.random() * 100); // 임의의 ID 생성
  } while (existingIDs.includes(newID)); // 새로운 ID가 기존 ID와 중복되지 않도록 확인
  return newID;
};
