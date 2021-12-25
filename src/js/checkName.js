// <!-- проверка ввода имени -->
// блокируем тест пока не получим имя, чтобы работала статистика
// и заносим имя в локалСторадж

// отключаем поля ввода пока не нажат чекбокс
let checkboxClick = document.querySelector("#flexSwitchCheckDefault");

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
};
// ------
function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

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

  // console.log(
  //   localStorage.getItem('user') + ' ' + localStorage.getItem('org')
  // );
  userButton.disabled = true;
  userButtonTest.disabled = false;

  flexSwitchCheckDefault.disabled = true;

  generationTest();
};
