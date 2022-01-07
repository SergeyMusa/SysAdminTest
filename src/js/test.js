// скрипты для страницы тест
// const gulpLodash = require('gulp-lodash');


// !!!!!!!!!!!!!! пока не работает импорт, делать по другому

// подключаем библиотеку Лодаш
// const lodash = require('lodash')
// console.log(gulpLodash.isEqual(1, 2));

// gulpLodash('Rainbow');


// формируем тест
const header = document.querySelector("header");
const section = document.querySelector("#top");
// const questionsNumber = 2;
// userButtonTest.disabled = false;
const answerList = {};
const answerListTrue = {};
let equal = "";


let requestURL = "./json/test.json";
let request = new XMLHttpRequest();

request.open("GET", requestURL);
request.responseType = "json";
request.send();
let sysAdminTest

//был запуск при старте страницы, соответственно этого скрипта
//имело смысл, когда несколько js файлов
// request.onload = function () {
const generationTest = () => {
    sysAdminTest = request.response;
    showTest(sysAdminTest);
    // testCount(sysAdminTest);

    // setTimeout(() => {
    //     console.log(Object.keys(answerList).length);
    // }, 5000)
};


function populateHeader(obj) {
    //const myH1 = document.createElement("h1.rezult");
    const myH1 = document.querySelector(".rezult");

    myH1.textContent = obj["jTestSysadmin"];
    header.appendChild(myH1);

    const user = document.createElement("p");

    user.textContent = `Тест проходит: ${localStorage.getItem('user')} из организации: ${localStorage.getItem('org')}, попытка №${localStorage.getItem('count') || '0'}`;
    //- let intervieweeName = user.textContent =localStorage.getItem('user');
    //- let intervieweeOrg = user.textContent =localStorage.getItem('org');
    header.appendChild(user);
}

function showTest(obj) {
    const questions = obj["survey"];

    for (let i = 1; i < questions.length; i++) {
        // console.log(questions.length);
        const myArticle = document.createElement("article");
        const testNumber = document.createElement("h2");
        const testQuestion = document.createElement("h5");
        const testVariants = document.createElement("p");
        const testAnswer = document.createElement("p");

        // const myList = document.createElement("ul");

        myArticle.setAttribute("class", "test3");

        testNumber.textContent = questions[i].numberTest;
        testQuestion.textContent = "Вопрос: " + questions[i].question;
        testVariants.textContent = "Варианты ответов: " + questions[i].answers;
        testAnswer.textContent =
            "Правильный ответ: " +
            questions[i].right +
            " - " +
            questions[i].justification;

        const radioAnswerList = document.createElement("div");

        const variantAnsver = questions[i].answers;
        for (let j = 1; j < variantAnsver.length; j++) {
            // const listItem = document.createElement("li");
            const radioAnswer = document.createElement("div");
            radioAnswer.innerHTML =
                `<input type='radio' name='answer${i}' value='${j}' onClick='onChangeButtonValue(${i},${j})'> <label for='${j}'>${variantAnsver[j]}</label>`;
            radioAnswerList.appendChild(radioAnswer)
        }
        answerList[i] = 0;

        myArticle.appendChild(testNumber);
        myArticle.appendChild(testQuestion);
        //
        myArticle.appendChild(radioAnswerList);

        // myArticle.appendChild(testAnswer);
        // ответ

        section.appendChild(myArticle);
        // myArticle.appendChild(myPara2);
    }

}

function onChangeButtonValue(num, value) {
    answerList[num] = value;
}


//function A(){$c=0;foreach($_SESSION['test']['objects'] as &$o){if($o['type']==1&&isset($o['an'])&&$o['an'])$c++;}return $c;}

// сравнение двух объектов с подсчетом процентов
function isEqual(answerList, answerListTrue) {

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
        console.log('что-то пошло не так, ответов и тестов разное кол-во');// 
        return false;
    };

    for (let i = 0; i < props2.length; i += 1) {
        const count = props1[i];

        if (answerList[count] === answerListTrue[count]) {
            answerRight++;
        }
        answerAmount++;
    };

    evaluation = Math.round(answerRight * 100 / answerAmount);

    const itog = evaluation < evaluationPoor ? 'You stupid, go out!!!' :
        evaluation < evaluationGood ? 'Poor' :
            evaluation < evaluationFine ? 'Good' :
                'Best'
        ;

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
    // console.log([42, 20, 100, 1, 3].sort());
    return itog; // true;
};


function checkTest() {
    //<input type="radio" name="answer0" value="0">
    userButtonTest.disabled = false;

    // let selectedAns = 0;
    // let questions;

    sysAdminTest["survey"].map(item => {
        answerListTrue[item.numberTest] = item.right;
    });
    delete answerListTrue["0"];
    // еще вариант
    // delete thisIsObject.0;

    console.log("answerList____: ", answerList);
    console.log('answerListTrue: ', answerListTrue);

    // !!!!!!!!!!!!! делаю тут

    equal = isEqual(answerList, answerListTrue);
    console.log('isEqual_', equal);

    // for (var i = 1; i < 4; i++) {
    //     // for (let [key, value] of answerRight) {
    //     console.log(i);
    // };

    // for (var i = 1; i < 5; i++) {
    // for (let [key, value] of answerRight) {
    //     console.log(i + "-2-");
    // };
    // for (let [key, value] of answerList.length) {
    console.log('al=', Object.keys(answerList).length);

    // console.log(42, key, "z", value);
    // };
    testCount();



    // работает вывод всего содержимого localStorage
    // const LS = { ...localStorage };
    // console.log(LS);
    //---------------
    // localStorage.setItem(i, '0');
    //   localStorage.getItem(j) 
    // !!!!!!!!!!!!! делаю тут
};

const testCount = () => {
    let count = Number(localStorage.getItem('count')) || 0;
    // console.log("count_= " + count);
    count++;
    localStorage.setItem('count', count);
    // console.log("count= " + localStorage.getItem('count'));
};

//
// правильные ответы можно выводить все вместе внизу
// потом сделать - перерисовать тест с выделением правильный

const doDelete = () => {
    // сброс счетчика тестов
    // localStorage.removeItem('count');
    localStorage.setItem('count', 0);

    console.log("count= " + localStorage.getItem('count'));
}

// }