// <!-- проверка ввода имени -->
// блокируем тест пока не получим имя, чтобы работала статистика
// и заносим имя в локалСторадж

// const { get } = require("lodash");

// отключаем поля ввода пока не нажат чекбокс
let checkboxClick = document.querySelector("#flexSwitchCheckDefault");


function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

const getTime = () => {
  let Data = new Date();
  let Year = Data.getFullYear();
  let Month = Data.getMonth();
  let Day = Data.getDate();
  let Hour = Data.getHours();
  let Minutes = Data.getMinutes();
  let Seconds = Data.getSeconds();
  // Вывод

  console.log(`${Day} - ${Hour}:${Minutes}:${Seconds}`);

  var now = new Date().toLocaleTimeString();
  var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

  console.log("utc " + utc + "__" + now);
  // document.write(Year);
  // document.write(Month);
  // document.write(Day);
  // document.write(Hour);
  // document.write(Minutes);
  // document.write(Seconds);

};

const disableButton = () => {
  // alert( 'чекбокс выключён1' );
  userOrg.disabled = true;
  userName.disabled = true;
  userButton.disabled = true;
  document.getElementById('autorization').hidden = false;


  if (checkboxClick.checked) {
    // alert( 'чекбокс включён' );
    userName.disabled = false;
    userOrg.disabled = false;
    userButton.disabled = false;
    // autorization.dis = false;
    document.getElementById('autorization').hidden = true;

  }
  getTime();
};
// ------

// выбираем имя по умолчанию если не введено что-то другое и заносим в локал сторадж
const doStartTest = () => {
  // alert( 'чекбокс выключён1' );
  const randomUser = randomInteger(100, 999);
  userName.placeholder = userName.placeholder + "_" + randomUser;
  let user = userName.placeholder;
  let org = userOrg.placeholder;

  if (userName.value !== "" && userOrg.value !== "") {
    // userName.placeholder = "Сыкло )";
    user = `"${userName.value}"`;
    org = `"${userOrg.value}"`;
  }

  localStorage.setItem('user', user);
  localStorage.setItem('org', org);
  // localStorage.setItem('timer', timer);

  // console.log(
  //   localStorage.getItem('user') + ' ' + localStorage.getItem('org')
  // );
  userButton.disabled = true;
  userButtonTest.disabled = false;
  flexSwitchCheckDefault.disabled = true;

  generationTest();
};
