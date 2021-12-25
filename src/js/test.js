// скрипты для страницы тест

// !!!!!!!!!!!!!! пока не работает импорт, делать по другому
// подключаем библиотеку Лодаш
// import * as _ from 'lodash';
// import _ from "lodash";
// console.log(_.isEqual(1, 2));

// формируем тест

// const doTest = () => {
const header = document.querySelector("header");
const section = document.querySelector("section");
const questionsNumber = 2;
// userButtonTest.disabled = false;
const answerList = {};

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
    populateHeader(sysAdminTest);
    showTest(sysAdminTest);
    testCount(sysAdminTest);
    setTimeout(() => {
        console.log(Object.keys(answerList).length);
    }, 5000)
};


function populateHeader(obj) {
    const myH1 = document.createElement("h1");
    myH1.textContent = obj["jTestSysadmin"];
    header.appendChild(myH1);

    const user = document.createElement("p");

    "Тест проходит: " +
        obj["intervieweeName"] +
        " из организации: " +
        obj["intervieweeOrg"];
    // user.textContent = 'Тест проходит: ' + localStorage.getItem('user') + ' из организации: ' + localStorage.getItem('org');
    //- let intervieweeName = user.textContent =localStorage.getItem('user');
    //- let intervieweeOrg = user.textContent =localStorage.getItem('org');
    header.appendChild(user);
}

function showTest(obj) {
    const questions = obj["survey"];

    for (let i = 0; i < questions.length; i++) {
        // console.log(questions.length);
        const myArticle = document.createElement("article");
        const testNumber = document.createElement("h2");
        const testQuestion = document.createElement("p");
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
        for (let j = 0 + 1; j < variantAnsver.length; j++) {
            // const listItem = document.createElement("li");
            const radioAnswer = document.createElement("div");

            radioAnswer.innerHTML =
                `<input type='radio' name='answer${i}' value='${j}' onClick='onChangeButtonValue(${i},${j})'> <label for='${j}'>${variantAnsver[j]}</label>`;
            // const listItem = document.createElement("radio");
            // listItem.textContent = variantAnsver[j];
            // radioAnswer.appendChild(listItem);
            radioAnswerList.appendChild(radioAnswer)
        }

        myArticle.appendChild(testNumber);
        myArticle.appendChild(testQuestion);
        //
        myArticle.appendChild(radioAnswerList);

        myArticle.appendChild(testAnswer);
        // ответ
        section.appendChild(myArticle);
        // myArticle.appendChild(myPara2);
    }
}

function onChangeButtonValue(num, value) {
    answerList[num] = value;
}


function checkTest() {
    //<input type="radio" name="answer0" value="0">
    // function question1()

    userButtonTest.disabled = false;

    let selectedAns = 0;
    let questions;

    const answerListTrue = {}

    sysAdminTest["survey"].map(item => {
        answerListTrue[item.numberTest] = item.right;
    })

    console.log('answerList: ', answerList, 'answerListTrue: ', answerListTrue);


    // console.log(sysAdminTest["survey"]);
    for (var i = 0; i < questionsNumber; i++) {
        // console.log("j- " + j);

        let answerNumber = (`answer${i}`);

        questions += document.getElementsByName(answerNumber)

        // console.log(`questions=` + questions);

        for (var j = 0 + 1; j < questions.length; j++) {
            // console.log("questions.length " + questions.length);

            if (questions[j].checked == true) {
                selectedAns = questions[j].value;
                console.log("value " + selectedAns);
                break;
            }

            // if (selectedAns == '1') {
            //     console.log("That the correct answer!");
            //     console.log("value " + selectedAns);
            //     //  break;
            // }
            // else {
            //     console.log("Oops! try again!");
            //     console.log("value " + selectedAns);
            //     //    break;
            // }
        };
    };
};
const testCount = () => {
    let count = Number(localStorage.getItem('count')) || 0;
    // console.log("count_= " + count);
    count = count + 1;
    // !!!!!!!!! исправить костыль с счетчиком(проверить может уже)
    localStorage.setItem('count', count);
    // console.log("count= " + localStorage.getItem('count'));
};

//
// правильные ответы можно выводить все вместе внизу
// потом сделать - перерисовать тест с выделением правильный

const doDelete = () => {
    // localStorage.removeItem('count');
    localStorage.setItem('count', 0);

    console.log("count= " + localStorage.getItem('count'));
}

// }