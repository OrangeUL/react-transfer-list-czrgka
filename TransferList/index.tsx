import React, { useState } from 'react';
import { data } from '../TransferList/data';
import './index.css';

export const TransferList = () => {
  const [updatedData, setUpdatedData] = useState(data);
  const [secondList, setsecondList] = useState([]);

  const handleClick = (id) => {
    setUpdatedData((prevData) => {
      return prevData.map((item) => {
        if (item.id === id) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
    });
  };

  const handleSecondClick = (id) => {
    setsecondList((prevData) => {
      return prevData.map((item) => {
        if (item.id === id) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
    });
  };

  const sendRightClick = () => {
    const unCheckedItems = updatedData.filter((obj) => obj.checked === false);
    const checkedItems = updatedData.filter((obj) => obj.checked === true);

    if (unCheckedItems) {
      setUpdatedData(unCheckedItems);
    }

    if (checkedItems) {
      const updatedCheckedItems = checkedItems.map((item) => ({
        ...item,
        checked: false,
      }));
      setsecondList((prevList) => [...prevList, ...updatedCheckedItems]);
    }
  };

  const sendLeftClick = () => {
    const unCheckedItems = secondList.filter((obj) => obj.checked === false);
    const checkedItems = secondList.filter((obj) => obj.checked === true);

    if (unCheckedItems) {
      setsecondList(unCheckedItems);
    }

    if (checkedItems) {
      const updatedCheckedItems = checkedItems.map((item) => ({
        ...item,
        checked: false,
      }));
      setUpdatedData((prevList) => [...prevList, ...updatedCheckedItems]);
    }
  };

  return (
    <div className="cols">
      <div className="list">
        {updatedData ? (
          updatedData.map((item) => (
            <button
              key={item.id}
              className={item.checked ? 'active' : 'not-active'}
              onClick={() => handleClick(item.id)}
            >
              {item.title}
            </button>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="controls">
        <button onClick={() => sendRightClick()}>send right</button>
        <button onClick={() => sendLeftClick()}>send left</button>
      </div>
      <div className="list">
        {secondList ? (
          secondList.map((item) => (
            <button
              key={item.id}
              className={item.checked ? 'active' : 'not-active'}
              onClick={() => handleSecondClick(item.id)}
            >
              {item.title}
            </button>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
