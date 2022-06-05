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

//do on start
// console.log('START');

const Anketa = {
    user: 'Ivan', //jokeBeginName
    org: 'Home',

    status: 0, //0-стр открыта, 1-тест начали, 2-тест закончили
    timeBegin: 0, //время начала теста
    timeEnd: 0, //время закончил тест
    result: '0', //процент правльных ответов и резюме

    equal: '',
    sysAdminTest: '',
    // timeBeginTest: 0,
    checkboxClick: document.querySelector("#flexSwitchCheckDefault"),

    header: document.querySelector("header"),
    section: document.querySelector("#top"),
    checkerAutorise: document.querySelector('#checkerAutorise'),
    checkerOneAll: document.querySelector('#checkerOneAll'),
    btnCheckTest: document.querySelector('.btn-success'), //btnCheckTest
    btnStartTest: document.querySelector('#btnStartTest'),
    inputUserOrg: document.querySelector('#inputUserOrg'),
    inputUserName: document.querySelector('#inputUserName'),

    editTop: function () {
        console.log("editTop");
    },
    // ПЕРЕЛЕДАТЬ
    populateHeader: function (obj) { // вывод сформированого заголовка
        const createH1 = document.querySelector(".result"); // h1.result
        const user = document.createElement("p");

        createH1.textContent = obj.jTestSysadmin;
        Anketa.header.appendChild(createH1);

        user.textContent = `Тест прошёл: ${localStorage.getItem('user')} из организации: 
            ${localStorage.getItem('org')}, попытка №${localStorage.getItem('count') || '0'}`;
        Anketa.header.appendChild(user);
    },
    doResult: function () {
        console.log("Result");
    }
};
//----
let 
    answerList = {},
    answerListTrue = {};

// const
// answers = {
//     answerList: {},
//     answerListTrue: {}
// };


//------------------------------------------

// userButtonTest.disabled = false;


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


//  загрузка JSON
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
        console.log(`Загрузка успешно завершена - ${resolve}`);
    })
    promise.catch(error => {
        console.log(111, error);
        // elResult.textContent += `Ошибка загрузки`;
    })
    promise.finally(() => {
        console.log("...");
        // isProcess = false;
    });
    return promise;
};
// -------------------------------------------------------------------------------------


Anketa.checkerAutorise.addEventListener('click', (event) => {
    togleInput();
    event.target.remove();
    // console.log(Anketa.checkerAutorise);

    Anketa.timeBegin = getTime();
    // console.log("timeBeginTest_"+timeBeginTest);
    // Anketa.status = 1;
});


Anketa.checkerOneAll.addEventListener('click', (event) => {
    let labelOneAll = document.getElementById('labelOneAll');
    if (Anketa.checkerOneAll.checked === true) {
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
    if (Anketa.checkboxClick.checked == false) {
        Anketa.inputUserName.setAttribute('disabled', true);
        Anketa.inputUserOrg.setAttribute('disabled', true);
        Anketa.btnStartTest.disabled = true;
    } else {
        Anketa.inputUserName.disabled = false;
        Anketa.inputUserOrg.disabled = false;
        Anketa.btnStartTest.disabled = false;
        alertRed.hidden = true;
        Anketa.checkerAutorise.style.color = "black";
    }
    Anketa.checkboxClick.checked = false;
}


Anketa.btnStartTest.addEventListener('click', (event) => { //const doStartTest = () => {
    const randomUser = randomInteger(100, 999);
    // выбираем имя по умолчанию если не введено что-то другое и заносим в локал сторадж
    inputUserName.placeholder = inputUserName.placeholder + "_" + randomUser;
    Anketa.user = Anketa.inputUserName.placeholder;
    Anketa.org = Anketa.inputUserOrg.placeholder;

    if (Anketa.inputUserName.value !== "" && Anketa.inputUserOrg.value !== "") {
        // userName.placeholder = "Сыкло )";
        Anketa.user = `"${Anketa.inputUserName.value}"`;
        Anketa.org = `"${Anketa.inputUserOrg.value}"`;
    }

    localStorage.setItem('user', Anketa.user);
    localStorage.setItem('org', Anketa.org);
    // localStorage.setItem('timer', timer);

    togleInput();
    Anketa.status = 1;
    // btnStartTest.disabled = true;
    // btnCheckTest.disabled = false;
    // event.target.remove();

    Anketa.sysAdminTest = request.response;

    (Anketa.checkerOneAll.checked) ? doTest(Anketa.sysAdminTest, 'One'): doTest(Anketa.sysAdminTest, 'All');
});



Anketa.btnCheckTest.addEventListener('click', () => { //userButtonTest //userButtonTest
    Anketa.btnCheckTest.disabled = true;
    Anketa.status = 2;

    Anketa.sysAdminTest.survey.map(item => { //sysAdminTest["survey"].map(item => {
        answerListTrue[item.numberTest] = item.right;
    });
    // delete answerListTrue[0]; //answerListTrue["0"] // убираем парковочный ответ ??

    console.log("answerList____: ", answerList);
    console.log('answerListTrue: ', answerListTrue);

    Anketa.equal = isEqual(answerList, answerListTrue);

    console.log('isEqual_', Anketa.equal);
    // console.log('al=', Object.keys(answerList).length);

    testCount();
    getTime();
});


function onChangeButtonValue(num, value) {
    answerList[num] = value;
}

function lengthObj2(Obj) {
    return Object.keys(Obj).length;
}

// function onChangeButtonValue2(num, value) {
//     // answerList[num] = value;
//     console.log(answerList[num] = value);
// }

//  перенести в начало ? ------------------------------
let randomQuestions = 0,
    questions = '';


function randomQuestion(obj) {
    questions = obj.survey;

    let testNumberArr = []; // get all number test in Arr & randomize

    for (let key in questions) { // for (let i = 1; i < questions.length; i++) { 
        testNumberArr.push(questions[key].numberTest);
    }

    testNumberArr.shift(); //  del parking 0

    randomQuestions = testNumberArr;
    const compareNum = (a, b) => a - b;
    randomQuestions.sort(compareNum); // check break in number question json, else err

    // function compareNum(a, b) {
    //     return a - b;
    // }

    if (randomQuestions[randomQuestions.length - 1] !== randomQuestions.length) {
        alert("произошла ошибка, свяжитесь с администратором admin@mail.net");
        console.log("ошибка в порядке номеров json");
        console.log(`ожидался номер:${randomQuestions.length}, а получен:${randomQuestions[randomQuestions.length-1]}`);
    }

    randomArr(testNumberArr); // рандом в первый раз раз запускать пустой, второй рабочий
    randomArr(testNumberArr);
    // console.log(testNumberArr);
    return testNumberArr;
}

function doTest(obj, how) { // формирование и вывод прямого теста
    randomQuestion(obj); // формируем случайную последовательность наших вопросов
    console.log(randomQuestions);
    
    const
        myArticle = document.createElement("article"),
        testNumber = document.createElement("h2"),
        testQuestion = document.createElement("h5"),
        testVariants = document.createElement("p"),
        testAnswer = document.createElement("p");
    // let position = document.querySelector('#top');

    let variantAnswer = '';

    myArticle.setAttribute("class", "test");

    // answers.answerList = document.createElement("div");

    if (how === 'All') { // чекер выводить по одному или все вопросы сразу 
        answerList = document.createElement("div");

        for (let i = 0; i < randomQuestions.length; i++) {
            const title =  document.createElement("div");

            variantAnswer = questions[randomQuestions[i]].answers;
            // console.log("variantAnswer_"+i+"-"+variantAnswer);
            testNumber.textContent = i + 1; //отображаемый number
            testQuestion.textContent = `Вопрос: ${questions[randomQuestions[i]].question}`;
            testVariants.textContent = `Варианты ответов: ${questions[randomQuestions[i]].answers}`;
            testAnswer.textContent   = `Правильный ответ: ${questions[randomQuestions[i]].right} - ${questions[randomQuestions[i]].justification}`;

            title.innerHTML=`<h3> ${testNumber.textContent} </h3> \n <h4>${testQuestion.textContent} </h4>`;
           
            myArticle.appendChild(title);
            showQuestion(randomQuestions[i]);
        }

// -------do there-------
    } else { //(how === 'One')
        let i = 0;
        // variantAnswer = questions[x[i]].answers;
        // testNumber.textContent = i + 1; //отображаемый number
        // testQuestion.textContent = "Вопрос: " + questions[x[i]].question;
        // testVariants.textContent = "Варианты ответов: " + questions[x[i]].answers;
        //     // testAnswer.textContent =   "Правильный ответ: " + questions[x[i]].right + " - " + questions[x[i]].justification;
        // testAnswer.textContent =
        //     "Правильный ответ: " +
        //     questions[x[i]].right +
        //     " - " +
        //     questions[x[i]].justification;

        // showQuestion(x[i]);
        // for (let i = 0; i < x.length; i++) {
        //     const answerButton = document.createElement("div");
        //     answerButton.innerHTML = `
        //     <button type='button' onClick='onChangeButtonValue2(${x[i]})' >${i+1}</button>
        //     `;
        //     answers.answerList.appendChild(answerButton);
        // }
    }

    function showQuestion(numberQuestion) {
        for (let numberAnswer = 1; numberAnswer < variantAnswer.length; numberAnswer++) {
            const radioAnswer = document.createElement("div");
            radioAnswer.innerHTML = `
                <input type='radio' name='answer${numberQuestion}' value='${numberAnswer}' onClick='onChangeButtonValue(${numberQuestion}, ${numberAnswer})'> 
                <label for='${numberAnswer}'>${variantAnswer[numberAnswer]}</label>`;
            // `<input type='radio' name='answer${x[i]}' value='${j}' onClick='onChangeButtonValue(${x[i]}, ${j})'> <label for='${j}'>${variantAnswer[j]}</label>`;
            answerList.appendChild(radioAnswer);
             myArticle.appendChild(radioAnswer);
            //  answers.answerList[i] = 0;
        }
        Anketa.section.appendChild(myArticle);

    }
}

//!!!!!!!!!!!!!!!!!!!!!!!! что за херня с именами ???????????????????????
function isEqual(answerListE, answerListTrueE) { // сравнение двух объектов с подсчетом процентов

    Anketa.populateHeader(Anketa.sysAdminTest);

    const props1 = Object.getOwnPropertyNames(answerListE);
    const props2 = Object.getOwnPropertyNames(answerListTrueE);

    let evaluation = 0;
    const evaluationPoor = 49;
    const evaluationGood = 70;
    const evaluationFine = 90;

    let answerAmount = 0;
    let answerRight = 0;

    // delete answerListTrueE['0']; // answerListTrueE.shift;

    console.log("1."+answerListE +'-'+answerListTrueE);
    console.log("2."+answerList+'-'+answerListTrue);

    if (props1.length !== props2.length-1) {
        console.log(props1.length +'-'+ props2.length);
        console.log('что-то пошло не так, ответов и тестов разное кол-во'); // 
        alert("вы ответили не на все вопросы");
        return false;
    }

    for (let i = 0; i < props2.length; i += 1) {
        const count = props1[i];

        if (answerListE[count] === answerListTrueE[count]) {
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
    // const 
    Anketa.section = document.querySelector("#bottom");
    // const testRez = document. ("h5");
    var delEl = document.querySelector('h5');
    delEl.remove();

    const testRez = document.createElement("h5");
    //const testTexst = document.createTextNode("Ответ:, rez");

    testRez.textContent = (`Правильных ответов: ${answerRight}, из ${answerAmount}, это ${evaluation}%, 
\nрезюме: ${itog}`);
    // console.log(answerAmount, answerRight, evaluation, '%', itog);

    Anketa.section.appendChild(testRez);
    // section.innerHTML =
    return itog; // true;
}

//====================================

// THE END