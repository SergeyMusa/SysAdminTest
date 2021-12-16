// <!-- проверка ввода имени -->

// отключаем поля ввода пока не нажат чекбокс
let checkboxClick = document.querySelector("#flexSwitchCheckDefault");

checkboxClick.onclick = function disableButton() {
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

// выбираем имя по умолчанию если не введено что-то другое и заносим в локал сторадж
const userFunction = () => {
  // alert( 'чекбокс выключён1' );
  let user = userName.placeholder;
  let org = userOrg.placeholder;

  if (userName.value !== "" && userOrg.value !== "") {
    // userName.placeholder = "Сыкло )";
    user = `"${userName.value}"`;
    org = `"${userOrg.value}"`;
  }
  // console.log(`userButton click ${user} ${org} `);

  localStorage.setItem('user', user);
  localStorage.setItem('org', org);

  console.log(
    localStorage.getItem('user') + ' ' + localStorage.getItem('org')
  );
  userButton.disabled = true;
  userButtonTest.disabled = false;

  flexSwitchCheckDefault.disabled = true;
};
