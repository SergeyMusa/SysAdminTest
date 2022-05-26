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

// const {
//     Button
// } = require("bootstrap");



const header = document.querySelector("header"),
    section = document.querySelector("#top"),
    checkerAutorize = document.querySelector('#checkerAutorize'),
    checkerOneAll = document.querySelector('#checkerOneAll'),
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
    timeBeginTest;


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

const requestURL = "./json/test.json",
    request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();



//=====NEW Promise=======================================================

const elResult = document.querySelector('#result');

function loadJson() {
    console.log("loadJson...");
    elResult.textContent = 'Идет загрузка данных...';

    const promise = new Promise((resolve, reject) => {
        const requestURL = "./json/test.json",
            request = new XMLHttpRequest();
        request.open("GET", requestURL);
        request.responseType = "json";
        request.send();
        if (res === 'ok') {
            resolve()
        }

    });

    promise.then(resolve => {
        // elResult.textContent += `Загрузка успешно завершена - ${resolve}`;
        // sysAdminTest = request.response;
        // console.log(sysAdminTest);
        console.log(`Загрузка успешно завершена - ${resolve}`);


        // showTest(sysAdminTest);
        // console.log(sysAdminTest);
        // throw new Error('Ошибка произошла в загрузке');
        // return;
    })
    promise.catch(error => {
        // elResult.textContent += `Ошибка загрузки`;
        console.log(111, error);
    })
    promise.finally(() => {
        console.log("...");
        // isProcess = false;
    });

    return promise;
}

// async function loadJson() {
//     console.log("loadJson...");
//     elResult.textContent = 'Идет загрузка данных...';
//     try {
//         // const requestURL = "./json/test.json",
//         //     request = new XMLHttpRequest();
//         // request.open("GET", requestURL);
//         // request.responseType = "json";
//         // request.send();
//         elResult.textContent += 'Загрузка успешно завершена';
//         // console.log("Загрузка успешно завершена -");
//         // sysAdminTest = request.response;
//         // showTest(sysAdminTest);
//         // console.log(sysAdminTest);
//     } catch (error) {
//         elResult.textContent += `Ошибка загрузки`;
//         console.log("Ошибка загрузки");
//     } finally {
//         console.log("...finally");
//     }
// }

//============================================================


checkerAutorize.addEventListener('click', (event) => {
    togleInput();
    event.target.remove();
    //-- NEW CODE
    // console.log(checkerAutorize);

    timeBeginTest = getTime();
    // надо убрать в функции вывод в консоль и сделать заносить значение в объект Анкета
    // console.log("timeBeginTest_"+timeBeginTest);
});


checkerOneAll.addEventListener('click', (event) => {
    let labelOneAll = document.getElementById('labelOneAll');

    if (checkerOneAll.checked === true) {
        labelOneAll.innerHTML = 'вопросы все подряд или <b>по одному</b>';
    } else {
        labelOneAll.innerHTML = 'вопросы <b>все подряд</b> или по одному';
    }
});

function togleInput() {
    // thing.classlist.toggle.disabled ? true: false;
    // let isHidden = thing.classlist.disabled; 
    // console.log('hide ', isHidden);
    const alertRed = document.getElementById('autorization');

    if (checkboxClick.checked == false) {
        inputUserName.setAttribute('disabled', true);
        inputUserOrg.setAttribute('disabled', true);
        btnStartTest.disabled = true;
    } else {
        inputUserName.disabled = false;
        inputUserOrg.disabled = false;
        btnStartTest.disabled = false;
        alertRed.hidden = true;
        checkerAutorize.style.color = "black";
    }
    checkboxClick.checked = false;

}


btnStartTest.addEventListener('click', (event) => { //const doStartTest = () => {
    const randomUser = randomInteger(100, 999);
    // выбираем имя по умолчанию если не введено что-то другое и заносим в локал сторадж
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

    togleInput();
    btnStartTest.disabled = true;
    btnCheckTest.disabled = false;
    // event.target.remove();

    sysAdminTest = request.response;

    (checkerOneAll.checked) ? doTest(sysAdminTest, 'One'): doTest(sysAdminTest, 'All');
});



btnCheckTest.addEventListener('click', () => { //userButtonTest //userButtonTest
    btnCheckTest.disabled = true;

    sysAdminTest.survey.map(item => { //sysAdminTest["survey"].map(item => {
        answerListTrue[item.numberTest] = item.right;
    });
    // delete answerListTrue[0]; //answerListTrue["0"] // убираем парковочный ответ ??

    // console.log("answerList____: ", answerList);
    // console.log('answerListTrue: ', answerListTrue);


    equal = isEqual(answerList, answerListTrue);
    // console.log('isEqual_', equal);
    // console.log('al=', Object.keys(answerList).length);

    testCount();
    getTime();
});


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

function onChangeButtonValue2(num, value) {
    // answerList[num] = value;
    console.log(answerList[num] = value);
}


let x = 0,
    questions = '';

function randomQuestion(obj) {
    questions = obj.survey;

    let testNumberArr = []; // get all number test in Arr & randomize

    for (let key in questions) { // for (let i = 1; i < questions.length; i++) { 
        testNumberArr.push(questions[key].numberTest);
    }
    testNumberArr.shift(); //  del parking 0

    x = testNumberArr;
    x.sort(compareNum); // check break in number question json, else err

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
    // console.log(testNumberArr);
    return testNumberArr;
}



function doTest(obj, how) { // формирование и вывод прямого теста

    randomQuestion(obj);
    console.log(x);
    // -------do there-------
    const myArticle = document.createElement("article"),
        testNumber = document.createElement("h2"),
        testQuestion = document.createElement("h5"),
        testVariants = document.createElement("p"),
        testAnswer = document.createElement("p");
    //myList = document.createElement("ul");

    const answerList = document.createElement("div");
    let variantAnswer = '';

    myArticle.setAttribute("class", "test");


    if (how == 'All') {
        for (let i = 0; i < x.length; i++) {
            variantAnswer = questions[x[i]].answers;
            testNumber.textContent = i + 1; //отображаемый number
            testQuestion.textContent = "Вопрос: " + questions[x[i]].question;
            testVariants.textContent = "Варианты ответов: " + questions[x[i]].answers;
            testAnswer.textContent =
                "Правильный ответ: " +
                questions[x[i]].right +
                " - " +
                questions[x[i]].justification;

            showQuestion(i);
        }
    } else { //(how == 'One')
        let i = 0;
        variantAnswer = questions[x[i]].answers;
        testNumber.textContent = i + 1; //отображаемый number
        testQuestion.textContent = "Вопрос: " + questions[x[i]].question;
        testVariants.textContent = "Варианты ответов: " + questions[x[i]].answers;
        testAnswer.textContent =
            "Правильный ответ: " +
            questions[x[i]].right +
            " - " +
            questions[x[i]].justification;

        showQuestion(i);

        for (let i = 0; i < x.length; i++) {
            const answerButton = document.createElement("div");
            answerButton.innerHTML = `
            <button type='button' onClick='onChangeButtonValue2(${x[i]})' >${i+1}</button>
            `;
            answerList.appendChild(answerButton);

        }
    }

    function showQuestion(i) {
        for (let j = 1; j < variantAnswer.length; j++) {
            // const listItem = document.createElement("li");
            const radioAnswer = document.createElement("div");
            radioAnswer.innerHTML =
                `<input type='radio' name='answer${x[i]}' value='${j}' onClick='onChangeButtonValue(${x[i]},
                                        ${j})'> <label for='${j}'>${variantAnswer[j]}</label>`;
            answerList.appendChild(radioAnswer);
        }

        myArticle.appendChild(testNumber);
        myArticle.appendChild(testQuestion);
        //
        myArticle.appendChild(answerList);
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



//====================================
//