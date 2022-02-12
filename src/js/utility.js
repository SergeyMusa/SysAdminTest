
const testCount = () => { // счетчик попыток
  let count = Number(localStorage.getItem('count = 0')); //('count')) || 0;
  // console.log("count_= " + count);
  count++;
  localStorage.setItem('count', count);
  // console.log("count= " + localStorage.getItem('count'));
};

const doDelete = () => {
  // сброс счетчика тестов
  // localStorage.removeItem('count');
  localStorage.setItem('count', 0);

  console.log("count= " + localStorage.getItem('count'));
};


function randomArr(arr) { // перемещать мессив
  arr.sort(() => Math.random() - 0.5);
}


function randomObj(obj) { // shuffle// перемещать объект
  let newObj = {};
  let keys = Object.keys(obj);
  keys.sort(function (a, b) {
      return Math.random() - 0.5;
  });
  keys.forEach(function (x) {
      newObj[x] = obj[x];
  });
  return newObj;
}

function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function getTime () {
  let Data = new Date();
  let Year = Data.getFullYear();
  let Month = Data.getMonth();
  let Day = Data.getDate();
  let Hour = Data.getHours();
  let Minutes = Data.getMinutes();
  let Seconds = Data.getSeconds();
  // Вывод

  console.log(`${Day} - ${Hour}:${Minutes}:${Seconds}`);

  let now = new Date().toLocaleTimeString();
  let utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
  // console.log("utc " + utc + "__" + now);

  // document.write(Year);
  // document.write(Month);
  // document.write(Day);
  // document.write(Hour);
  // document.write(Minutes);
  // document.write(Seconds);
}
