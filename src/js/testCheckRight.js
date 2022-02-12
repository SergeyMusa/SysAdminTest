// надо сделать проверки теста:
// 1- соответствие имени ?

// 2- затраченое время
// 2-2 соответствие времени на компе и в тесте
// 2-2-3 получить место где комп по айпи и выяснить местное время

// 3- сколько раз запускали тесте
// 3-2 отсутствие коррекции локалСторадж


// 9- защита оз изменения кода на странице ?

// таймер

// добавить оценку теста +-

// средний результат

// печать результата или отправить на почту

// сделать своою выборку тестов

// форма отзывов: ошибки или предложения

// id теста, показывает количество вызовов за день(чтобы не откатывали назад - не жульничали)



const checkTestRight = () => {
    console.log('Right');
}; 

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// правильные ответы можно выводить все вместе внизу
// потом сделать - перерисовать тест с выделением правильный




// 'use strict';
// const fs = require('fs');

// const loadJSON = (filepath) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filepath, 'utf8', (err, content) => {
//       if(err) {
//         reject(err)
//       } else {
//         try {
//           resolve(JSON.parse(content));
//         } catch(err) {
//           reject(err)
//         }
//       }
//     })
//   });
// }

// loadJSON(`${__dirname}/pareto.json`)
// .then(console.log)
// .catch(console.log);



// function getJSON(url) {
//     return new Promise(function(resolve, reject) {
//         const req = https.get(url, res => {
//             let json = '';
//             res.on('data', function(chunk) { json += chunk; });
//             res.on('end', function() { resolve(JSON.parse(json)); });
//         });
//         req.on('error', function(err) { console.log(err); });
//     });
// };

// const weather = () => {

//     getJSON('yourURL')
//         .then((data) => console.log(data))
//         .catch((error) => console.error(error));
// }