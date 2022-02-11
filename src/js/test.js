// скрипты для страницы тест
// !!!!!!!!!!!!!! пока не работает импорт, делать по другому
// const gulpLodash = require('gulp-lodash');
//-
// const { keys } = require("lodash");
//-
// подключаем библиотеку Лодаш
// const lodash = require('lodash')
// console.log(gulpLodash.isEqual(1, 2));
// gulpLodash('Rainbow');

let requestURL = "./json/test.json",
    request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();

const header = document.querySelector("header"),
      section = document.querySelector("#top"),
      checkerAutorize = document.querySelector('#autorize'),
      btnCheckTest = document.querySelector('.btn-success'), //btnCheckTest
      btnStartTest = document.querySelector('#btnStartTest'),
      inputUserOrg = document.querySelector('#inputUserOrg'),
      inputUserName = document.querySelector('#inputUserName');
   
let checkboxClick = document.querySelector("#flexSwitchCheckDefault");

// userButtonTest.disabled = false;
const answerList = {},
      answerListTrue = {};
let equal = '',
    sysAdminTest = '',
    timeBeginTest = 0;
    

// //  тренировочный объект
// const myObject = {
//     'n1': '1',
//     'n2': 12,
//     'n3': 3,
//     n4: 4,
//     n5: {
//         mm1: '1001',
//         mm2: '1012',
//         mm3: 1003
//     }
// }; // в json 'numberTest'
// let myArray = [1, 10, 2, 14, 20, 44, 4, 7];

//-------------------------------------------------------------------------------    
// request.onload = function () {
const generationTest = () => {
    sysAdminTest = request.response;
    showTest(sysAdminTest);
    // testCount(sysAdminTest);
};




//=====NEW Promise=======================================================
{/* <div><button id="run">Новая попытка</button></div>
<div id="result"></div> */}

let isProcess = false;
const elResult = document.querySelector('#result');

  document.querySelector('#run').onclick = () => {
    if (isProcess) {
      elResult.textContent = 'Подождите! Задача ещё выполняется!';
      return;
    }
    isProcess = true;
    elResult.textContent = 'Задача в процессе...';
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const mark = Math.floor(Math.random() * 4) + 2;
        mark > 3 ? resolve(mark) : reject(mark);
      }, 3000);
    });
    promise
      .then(value => {
        elResult.textContent = `Ура! Вы сдали экзамен на ${value}! Папа, как и обещал дал вам 100$.`;
      })
      .catch(value => {
        elResult.textContent = `Увы, вы получили оценку ${value}! Папа не дал вам 100$`;
      })
      .finally(() => {
        isProcess = false;
      });
  };
//============================================================



// ПЕРЕЛЕДАТЬ
function populateHeader(obj) { // вывод сформированого заголовка
    const createH1 = document.querySelector(".rezult"); // h1.rezult
    const user = document.createElement("p");

    createH1.textContent = obj.jTestSysadmin;
    header.appendChild(createH1);

    user.textContent = `Тест проходит: ${localStorage.getItem('user')} из организации: 
        ${localStorage.getItem('org')}, попытка №${localStorage.getItem('count') || '0'}`;
    header.appendChild(user);
}


function onChangeButtonValue(num, value) {
    answerList[num] = value;
}

function lengthObj2(Obj) {
    return Object.keys(Obj).length;
}


function showTest(obj) { // формирование и вывод прямого теста
    const questions = obj.survey;

    let testNumberArr = []; // get all number test in Arr & randomize
    // for (let i = 1; i < questions.length; i++) { 
    for (let key in questions) {
        testNumberArr.push(questions[key].numberTest);
    }
    testNumberArr.shift(); //  del parking 0

    let x = testNumberArr;
    // check break in number question json, else err
    // console.log(typeof(x));
    x.sort(compareNum);
    function compareNum(a, b) {
        return a - b;
    }
    if (x[x.length - 1] !== x.length) {
        alert("произошла ошибка, свяжитесь с администратором admin@mail.net");
        console.log("ошибка в порядке номеров json");
        console.log(`ожидался номер:${x.length}, а получен:${x[x.length-1]}`);
    }

    randomArr(testNumberArr); // рандом в первый раз раз запускать пустой, второй рабочий
    randomArr(testNumberArr);
    console.log(testNumberArr);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// -------do there-------
    for (let i = 0; i < x.length; i++) {

        const myArticle = document.createElement("article");
        const testNumber = document.createElement("h2");
        const testQuestion = document.createElement("h5");
        const testVariants = document.createElement("p");
        const testAnswer = document.createElement("p");
        // const myList = document.createElement("ul");

        myArticle.setAttribute("class", "test");

        testNumber.textContent = i + 1; //отображаемый number
        testQuestion.textContent = "Вопрос: " + questions[x[i]].question;
        testVariants.textContent = "Варианты ответов: " + questions[x[i]].answers;
        testAnswer.textContent =
            "Правильный ответ: " +
            questions[x[i]].right +
            " - " +
            questions[x[i]].justification;

        const radioAnswerList = document.createElement("div");
        const variantAnswer = questions[x[i]].answers;
        for (let j = 1; j < variantAnswer.length; j++) {

            // const listItem = document.createElement("li");
            const radioAnswer = document.createElement("div");
            radioAnswer.innerHTML =
                `<input type='radio' name='answer${x[i]}' value='${j}' onClick='onChangeButtonValue(${x[i]},
                                        ${j})'> <label for='${j}'>${variantAnswer[j]}</label>`;
            radioAnswerList.appendChild(radioAnswer);
        }

        myArticle.appendChild(testNumber);
        myArticle.appendChild(testQuestion);
        //
        myArticle.appendChild(radioAnswerList);
        // myArticle.appendChild(testAnswer);   // ответ
        section.appendChild(myArticle);
    }
}


function isEqual(answerList, answerListTrue) { // сравнение двух объектов с подсчетом процентов

    populateHeader(sysAdminTest);

    const props1 = Object.getOwnPropertyNames(answerList);
    const props2 = Object.getOwnPropertyNames(answerListTrue);

    let evaluation = 0;
    const evaluationPoor = 49;
    const evaluationGood = 70;
    const evaluationFine = 90;

    let answerAmount = 0;
    let answerRight = 0;

    // delete answerListTrue["0"];

    if (props1.length !== props2.length) {
        console.log('что-то пошло не так, ответов и тестов разное кол-во'); // 
        alert("вы ответили не на все вопросы");
        return false;
    }

    for (let i = 0; i < props2.length; i += 1) {
        const count = props1[i];

        if (answerList[count] === answerListTrue[count]) {
            answerRight++;
        }
        answerAmount++;
    }

    evaluation = Math.round(answerRight * 100 / answerAmount);

    const itog = evaluation < evaluationPoor ? 'You stupid, go out!!!' :
        evaluation < evaluationGood ? 'так-себе результат' :
        evaluation < evaluationFine ? 'хорошие знания' :
        'поздравляю, ты спец';

    //!!!!!!!!!!!!!!!!!
    // for (let [key, value] of answerRight) {
    // console.log(i);
    // };
    const section = document.querySelector("#bottom");
    // const testRez = document. ("h5");
    var delEl = document.querySelector('h5');
    delEl.remove();

    const testRez = document.createElement("h5");
    //const testTexst = document.createTextNode("Ответ:, rez");

    testRez.textContent = (`Правильных ответов: ${answerRight}, из ${answerAmount}, это ${evaluation}%, 
    \nрезюме: ${itog}`);
    // console.log(answerAmount, answerRight, evaluation, '%', itog);

    section.appendChild(testRez);
    // section.innerHTML =
    return itog; // true;
}


btnCheckTest.addEventListener('click', () => { //userButtonTest //userButtonTest
    btnCheckTest.disabled = true;

    sysAdminTest.survey.map(item => { //sysAdminTest["survey"].map(item => {
        answerListTrue[item.numberTest] = item.right;
    });
    delete answerListTrue[0]; //answerListTrue["0"] // убираем парковочный ответ

    console.log("answerList____: ", answerList);
    console.log('answerListTrue: ', answerListTrue);

    // !!!!!!!!!!!!! делаю тут
    equal = isEqual(answerList, answerListTrue);
    console.log('isEqual_', equal);

    console.log('al=', Object.keys(answerList).length);
    // !!!!!!!!!!!!! делаю тут

    testCount();
    getTime();
// }
});


checkerAutorize.addEventListener ('click', (event) =>{
    togleInput();
    event.target.remove();
      //-- NEW CODE
      // console.log(checkerAutorize);
     
    timeBeginTest = getTime();
    console.log(timeBeginTest);
  });
    
  

function togleInput() {
    // thing.classlist.toggle.disabled ? true: false;
    // let isHidden = thing.classlist.disabled; 
    // console.log('hide ', isHidden);
    const alertRed = document.getElementById('autorization');
    // const cheker = document.querySelector('#flexSwitchCheckDefault'); // getElementById('autorization');

// console.log(cheker.checked);
    if (checkboxClick.checked == false) {
        inputUserName.setAttribute('disabled', true) ;
        inputUserOrg.setAttribute('disabled', true) ;
        btnStartTest.disabled = true;
        // alertRed.hidden = false;
        // checkboxClick.checked = true;
    } else {
        inputUserName.disabled = false;
        inputUserOrg.disabled = false;
        btnStartTest.disabled = false;
        alertRed.hidden = true;
        checkerAutorize.style.color = "black";
    }
    checkboxClick.checked = false;
    // console.log('checkboxClick= ', checkboxClick.checked);
    // console.log(inputUserName);
}



// выбираем имя по умолчанию если не введено что-то другое и заносим в локал сторадж
btnStartTest.addEventListener('click', (event) => { //const doStartTest = () => {
  const randomUser = randomInteger(100, 999);

  inputUserName.placeholder = inputUserName.placeholder + "_" + randomUser;
  let user = inputUserName.placeholder;
  let org = inputUserOrg.placeholder;

  if (inputUserName.value !== "" && inputUserOrg.value !== "") {
    // userName.placeholder = "Сыкло )";
    user = `"${inputUserName.value}"`;
    org = `"${inputUserOrg.value}"`;
  }

  localStorage.setItem('user', user);
  localStorage.setItem('org', org);
  // localStorage.setItem('timer', timer);

  // console.log(
  //   localStorage.getItem('user') + ' ' + localStorage.getItem('org')
  // );

  console.log('checkboxClick= ', checkboxClick.checked);
  togleInput();
  console.log('checkboxClick= ', checkboxClick.checked);

  btnStartTest.disabled = true;
//   flexSwitchCheckDefault.disabled = true;
  btnCheckTest.disabled = false;
// event.target.remove();

  generationTest();

});
//====================================
//
