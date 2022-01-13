// скрипты для страницы тест
// const gulpLodash = require('gulp-lodash');


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
let myArr = [];

function showTest(obj) { // формирование и вывод прямого теста
    const questions = obj.survey;

    // рандом в первый раз раз запускать пустой, второй рабочий
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // randomObj(myObject);
    // console.log(randomObj(myObject)); //
    // console.log(randomObj(myObject));
    // console.log(randomObj(myObject));


    // Object.keys(myObject).map(function (key, index) {
    //     myObject[key] *= 2;
    // });
    // myArr = Object.values(myObject); // этой строкой преобразуем объект в массив

    // console.log(myObject.n5);
    // console.log(myArr);

    // console.log(typeof(myObject) );
    console.log("+++++++++++++++++++++++++++");
    for (let key in myObject) {
        // delete questions[key][0] ;// ["0"];
        // console.log("key_", typeof(myObject[key]) );

        if (typeof (myObject[key]) === 'object') {
            for (let key2 in myObject[key]) {
                // console.log("[key2_",typeof(myObject[key][key2]) );
                console.log("key2__", key2, "--", myObject[key][key2]);
            }
        } else {
            console.log("key_", key, "--", myObject[key]);
        }
    }
    console.log("--------------");


    // console.log(questions.map(function (y) {return y}));
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    // let arrNumberQwestion ; // исправить на получение из json
    //    let arrNumberQwestion = sysAdminTest.numberTest.parse({});

    function contains(arr, elem) {
        return arr.find((i) => i === elem) != -1;
    }

    for (let i = 1; i < questions.length; i++) {
        const myArticle = document.createElement("article");
        const testNumber = document.createElement("h2");
        const testQuestion = document.createElement("h5");
        const testVariants = document.createElement("p");
        const testAnswer = document.createElement("p");
        // const myList = document.createElement("ul");

        myArticle.setAttribute("class", "test");

        testNumber.textContent = questions[i].numberTest;
        testQuestion.textContent = "Вопрос: " + questions[i].question;
        testVariants.textContent = "Варианты ответов: " + questions[i].answers;
        testAnswer.textContent =
            "Правильный ответ: " +
            questions[i].right +
            " - " +
            questions[i].justification;

        const radioAnswerList = document.createElement("div");
        const variantAnswer = questions[i].answers;

        // !!!!!!!!!!! do there


        for (let j = 1; j < variantAnswer.length; j++) {
            // const listItem = document.createElement("li");
            const radioAnswer = document.createElement("div");
            radioAnswer.innerHTML =
                `<input type='radio' name='answer${i}' value='${j}' onClick='onChangeButtonValue(${i},
                                ${j})'> <label for='${j}'>${variantAnswer[j]}</label>`;
            radioAnswerList.appendChild(radioAnswer);
        }
        // }
        // console.log("arrNewForCheck= "+arrNewForCheck);
        answerList[i] = 0;

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