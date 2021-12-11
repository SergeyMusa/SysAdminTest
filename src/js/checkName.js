// <!-- проверка ввода имени -->

// отключаем поля ввода пока не нажат чекбокс
  var c = document.querySelector("#flexSwitchCheckDefault");
  c.onclick = function () {
    // alert( 'чекбокс выключён1' );
    userOrg.disabled = true;
    userName.disabled = true;
    userButton.disabled = true;

    if (c.checked) {
      // alert( 'чекбокс включён' );
      userName.disabled = false;
      userOrg.disabled = false;
      userButton.disabled = false;
    }
  };
  // ------

  // выбираем имя по умолчанию если не введено что-то другое и заносим в локал сторадж
  const userFunction = () => {
    // alert( 'чекбокс выключён1' );
    let user = userName.placeholder;
    let org = userOrg.placeholder;

    if (userName.value !== "" || userOrg.value !== "") {
      // userName.placeholder = "Сыкло )";
      user = `"userName=${userName.value}"`;
      // org = userOrg.value ;
      org = `"userOrg=${userOrg.value}"`;
    }
    console.log(`userButton click ${user} ${org} `);
    // console.log( ' userButton click ' + 'яяяяяяя' );
    document.cookie = user;
    org;
    // document.cookie = org;
    console.log(
      `document.cookie =  ${(document.cookie =
        user)} ${(document.cookie = org)} `
    );
    // alert( document.cookie );
    // function showCookies() {
    // const output = document.getElementById('cookies');
    // output.textContent = '> ' + document.cookie;
    // }
  };
  //  console.log( ' userButton click' );
//</script>
