const doAnswer = () => {

    // localStorage.setItem('count', "");
    const header = document.querySelector("header");
    // !!!!!!!!!!!!не работает
    const section = document.querySelector("[id = 'bottom']");
    // const section = document.getElementById('bottom');

    let requestURL = "./json/test.json";
    let request = new XMLHttpRequest();

    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();

    request.onload = function () {
        const sysAdminTest = request.response;
        checkTest();

        populateHeader(sysAdminTest);
        showTest(sysAdminTest);
        testCount(sysAdminTest);
    };


    const htmlElement = document.documentElement;
    const firstChildNodeH = htmlElement.firstChild;
    const lastChildNodeH = htmlElement.lastChild;
    console.log("htmlElement___" + htmlElement);
    console.log("firstChildNodeH" + firstChildNodeH);
    console.log("lastChildNodeH" + lastChildNodeH);


    const headElement = document.head;
    const firstChildNodeHd = headElement.firstChild;
    const lastChildNodeHd = headElement.lastChild;
    console.log("headElement______" + headElement);
    console.log("firstChildNodeHd" + firstChildNodeHd);
    console.log("lastChildNodeHd" + lastChildNodeHd);

    const bodyElement = document.body;
    const firstChildNodeB = bodyElement.firstChild;
    const lastChildNodeB = bodyElement.lastChild;
    console.log("bodyElement__________" + bodyElement);
    console.log("firstChildNodeB" + firstChildNodeB);
    console.log("lastChildNodeB" + lastChildNodeB);



    // получаем результаты с чекбоксов и заносим их в локал сторадж
    //   localStorage.setItem('count', count);

    // !!!!!! присвоить количество вопросов
    const questionsNumber = 2;

    function checkTest() {
        //<input type="radio" name="answer0" value="0">
        // function question1()
        let selectedAns = 0;

        for (var j = 0; j < questionsNumber; j++) {
            console.log("j- " + j);

            let answerNumber = (`"answer${j}"`);
            // console.log(typeof (answerNumber) + answerNumber);
            console.log(answerNumber);
            //!!!!!!!!!!!!!!!!!!!!! строка работает а переменная нет
            let questions = document.getElementsByName(answerNumber);

            console.log(`questions=` + questions);

            for (var i = 0; i < questions.length; i++) {
                console.log("questions.length " + questions.length);

                if (questions[i].checked == true) {
                    selectedAns = questions[i].value;
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






    function populateHeader(obj) {
        const myH1 = document.createElement("h3");
        myH1.textContent = obj["jTestSysadmin"];
        // header.appendChild(myH1);

        const user = document.createElement("p");

        "Тест проходит: " +
            obj["intervieweeName"] +
            " из организации: " +
            obj["intervieweeOrg"];
        user.textContent = 'Тест проходит: ' + localStorage.getItem('user') + ' из организации: ' + localStorage.getItem('org');
        //- let intervieweeName = user.textContent =localStorage.getItem('user');
        //- let intervieweeOrg = user.textContent =localStorage.getItem('org');

        header.appendChild(user);

    };

    function showTest(obj) {
        const questions = obj["jSurvey"];
        for (let i = 0; i < questions.length; i++) {

            const myArticle = document.createElement("article");
            const myH2 = document.createElement("h2");
            const myPara3 = document.createElement("p");

            myArticle.setAttribute("class", "test3");

            myH2.textContent = questions[i].numberTest;
            myPara3.textContent =
                "Правильный ответ: " +
                questions[i].right +
                " - " +
                questions[i].justification;

            myArticle.appendChild(myH2);
            myArticle.appendChild(myPara3);
            // ответ
            console.log(questions[i].right);
        };

        const userRezult = document.createElement("p");
        userRezult.textContent =
            "Результаты теста: " +
            obj["result"] +
            " использовано попыток " +
            localStorage.getItem('count');
        // obj["attempt"];
        header.appendChild(userRezult);


    };

    console.log("------------------do Answer");
    console.log("count= " + localStorage.getItem('count'));

    const testCount = () => {
        let count = Number(localStorage.getItem('count')) || 0;
        // console.log("count_= " + count);
        count = count + 1;
        // !!!!!!!!! исправить костыль
        localStorage.setItem('count', count);
        // console.log("count= " + localStorage.getItem('count'));
    };

    //
    // правильные ответы можно выводить все вместе внизу
    // потом сделать - перерисовать тест с выделением правильный
}

const doDelete = () => {
    // localStorage.removeItem('count');
    localStorage.setItem('count', 0);

    console.log("count= " + localStorage.getItem('count'));
}
