import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

function TopInfo({ onClickAdd }) {
  const [currentTime, setCurrentTime] = useState(dayjs().locale('ko').format('YYYY.MM.DD HH:mm:ss'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().locale('ko').format('YYYY.MM.DD HH:mm:ss'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <h1>My React To Do List</h1>
      <div className="topNavbar">
        <time>TODAY : {currentTime}</time>
        <button type="button" className="addButton" onClick={onClickAdd}>
          추가
        </button>
      </div>
    </>
  );
}

export default TopInfo;
