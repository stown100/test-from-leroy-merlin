import axios from "axios";
import React from "react";
import Payment from "./Payment";

function App() {
  const [items, setItems] = React.useState([]);

  // Достаю данные с сервера
  React.useEffect(() => {
    axios.get("http://localhost:3000/payments").then(({ data }) => {
      setItems(data);
    });
  }, []);

  // Перевожу формат timestamp в "yyyy-mm-dd":
  const arr = [];
  for (let i = 0; i < items.length; i++) {
    const date_not_formatted = new Date(items[i].createdAt);
    let formatted_string = date_not_formatted.getFullYear() + "-";

    if (date_not_formatted.getMonth() < 9) {
      formatted_string += "0";
    }
    formatted_string += date_not_formatted.getMonth() + 1;
    formatted_string += "-";

    if (date_not_formatted.getDate() < 10) {
      formatted_string += "0";
    }
    formatted_string += date_not_formatted.getDate();
    arr.push({ createdAt: formatted_string, sum: items[i].sum });
  }

  const dayArr = (arr) => {
    // Нахожу уникальные даты и возвращаю массив обьектов с уникальными датами и суммой - 0
    const oneDate = [...new Set(arr.map((i) => i.createdAt))].map((item) => {
      return {
        createdAt: item,
        sum: 0,
      };
    });
    for (let i = 0; i < arr.length; i++) {
      for (let k = 0; k < oneDate.length; k++) {
        // Если дата и уникального массива равно дате из общего массива, к 0 прибавляем все суммы за этот день
        if (oneDate[k].createdAt === arr[i].createdAt) {
          oneDate[k].sum += arr[i].sum;
        }
      }
    }
    // Возвращаю отсортированный массив из 3-х обьектов с наибольшей суммой
    return oneDate.sort((a, b) => b.sum - a.sum).slice(0, 3);
  };

  const resultArray = dayArr(arr);

  return (
    <div className="App">
      <table className="table">
        <thead>
          <tr>
            <th>Дата платежей</th>
            <th>Сумма платежей</th>
          </tr>
        </thead>
        {resultArray &&
          resultArray.map((obj, index) => {
            return <Payment {...obj} key={index} />;
          })}
      </table>
    </div>
  );
}

export default App;
