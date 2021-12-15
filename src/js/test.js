// формируем тест

const doTest = () => {
    const header = document.querySelector("header");
    const section = document.querySelector("section");

    let requestURL = "./json/test.json";
    let request = new XMLHttpRequest();

    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();

    request.onload = function () {
        const sysAdminTest = request.response;
        populateHeader(sysAdminTest);
        showTest(sysAdminTest);
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
        const questions = obj["jSurvey"];

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
            console.log(variantAnsver);
            for (let j = 0; j < variantAnsver.length; j++) {
                // const listItem = document.createElement("li");
                const radioAnswer = document.createElement("div");

                radioAnswer.innerHTML =
                    `<input type='radio' name='answer${i}' value="${j}"> <label for='${j}'>${variantAnsver[j]}</label>`;
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

        // const userRezult = document.createElement("p");
        // userRezult.textContent =
        //     "Результаты теста: " +
        //     obj["result"] +
        //     " использовано попыток " +
        //     localStorage.getItem('count');
        // // obj["attempt"];
        // header.appendChild(userRezult);
    }
    userButtonTest.disabled = true;
    userButtonRezult.disabled = false;
}