// скрипты для страницы тест
// const gulpLodash = require('gulp-lodash');

// const { keys } = require("lodash");


// !!!!!!!!!!!!!! пока не работает импорт, делать по другому
// подключаем библиотеку Лодаш
// const lodash = require('lodash')
// console.log(gulpLodash.isEqual(1, 2));
//
// gulpLodash('Rainbow');

let requestURL = "./json/test.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
let sysAdminTest;

const header = document.querySelector("header");
const section = document.querySelector("#top");
// userButtonTest.disabled = false;
const answerList = {};
const answerListTrue = {};
let equal = "";
// 
const arrNewForCheck = {};


//был запуск при старте страницы, соответственно этого скрипта
//имело смысл, когда несколько js файлов
// request.onload = function () {
const generationTest = () => {
    sysAdminTest = request.response;
    showTest(sysAdminTest);
    // testCount(sysAdminTest);
};


function populateHeader(obj) { // вывод сформированого заголовка
    const createH1 = document.querySelector(".rezult"); // h1.rezult
    createH1.textContent = obj.jTestSysadmin;
    header.appendChild(createH1);

    const user = document.createElement("p");
    user.textContent = `Тест проходит: ${localStorage.getItem('user')} из организации: 
        ${localStorage.getItem('org')}, попытка №${localStorage.getItem('count') || '0'}`;
    header.appendChild(user);
}

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



function onChangeButtonValue(num, value) {
    answerList[num] = value;
}


function lengthObj2(Obj) {
    return Object.keys(Obj).length;
}

//  тренировочный объект
const myObject = {
    'n1': '1',
    'n2': 12,
    'n3': 3,
    n4: 4,
    n5: {
        mm1: '1001',
        mm2: '1012',
        mm3: 1003
    }
}; // в json 'numberTest'
let myArray = [1, 10, 2, 14, 20, 44, 4 ,7];


 

function showTest(obj) { // формирование и вывод прямого теста
    const questions = obj.survey;

    // рандом в первый раз раз запускать пустой, второй рабочий
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // console.log("+++++++++++++++++++++++++++");
    let testNumberArr = []; // get all number test in Arr & randomize
        // for (let i = 1; i < questions.length; i++) { 
        for (let key in questions) {    
            testNumberArr.push( questions[key].numberTest );
        }
        testNumberArr.shift() ; //  del parking 0
    
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    let x = testNumberArr;
// check break in number question json, else err
    // console.log(typeof(x));
    x.sort(compareNum);

    function compareNum (a, b) {
        return a - b;
    }
    if (x[x.length-1] !== x.length) {
        alert("произошла ошибка, свяжитесь с администратором admin@mail.net");
        console.log("ошибка в порядке номеров json");
        console.log(`ожидаелся номер:${x.length}, а получен:${x[x.length-1]}`);
    }
    
    randomArr(testNumberArr);
        randomArr(testNumberArr);
    console.log(testNumberArr);

    for (let i = 0; i < x.length; i++) {
        
        const myArticle = document.createElement("article");
        const testNumber = document.createElement("h2");
        const testQuestion = document.createElement("h5");
        const testVariants = document.createElement("p");
        const testAnswer = document.createElement("p");
        // const myList = document.createElement("ul");

        myArticle.setAttribute("class", "test");

        testNumber.textContent = i + 1 ; //questions[x[i]].numberTest;
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


function checkTest() { // проверка результатов теста
    userButtonTest.disabled = false;

    // let selectedAns = 0;
    // let questions;

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
    // работает вывод всего содержимого localStorage
    // const LS = { ...localStorage };
    // console.log(LS);
    //---------------
    // localStorage.setItem(i, '0');
    //   localStorage.getItem(j) 

}

const testCount = () => { // счетчик попыток
    let count = Number(localStorage.getItem('count')) || 0;
    // console.log("count_= " + count);
    count++;
    localStorage.setItem('count', count);
    // console.log("count= " + localStorage.getItem('count'));
};

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// правильные ответы можно выводить все вместе внизу
// потом сделать - перерисовать тест с выделением правильный

const doDelete = () => {
    // сброс счетчика тестов
    // localStorage.removeItem('count');
    localStorage.setItem('count', 0);

    console.log("count= " + localStorage.getItem('count'));
};

// }