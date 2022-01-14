const iqFunction = () => {
    // const htmlElement = document.documentElement;
    // const firstChildNodeH = htmlElement.firstChild;
    // const lastChildNodeH = htmlElement.lastChild;
    // console.log("htmlElement___" + htmlElement);
    // console.log("firstChildNodeH" + firstChildNodeH);
    // console.log("lastChildNodeH" + lastChildNodeH);

    // const headElement = document.head;
    // const firstChildNodeHd = headElement.firstChild;
    // const lastChildNodeHd = headElement.lastChild;
    // console.log("headElement______" + headElement);
    // console.log("firstChildNodeHd" + firstChildNodeHd);
    // console.log("lastChildNodeHd" + lastChildNodeHd);

    // const bodyElement = document.body;
    // const firstChildNodeB = bodyElement.firstChild;
    // const lastChildNodeB = bodyElement.lastChild;
    // console.log("bodyElement__________" + bodyElement);
    // console.log("firstChildNodeB" + firstChildNodeB);
    // console.log("lastChildNodeB" + lastChildNodeB);
    // return 'index'
    console.log("!!!!!!!!!!!!!!!!!!");
       // setTimeout(() => {
    //     console.log(Object.keys(answerList).length);
    // }, 5000)
};

// просто прикольно резобрать 
//function A(){$c=0;foreach($_SESSION['test']['objects'] as &$o){if($o['type']==1&&isset($o['an'])&&$o['an'])$c++;}return $c;}
function sortStrArr(arr) { //сотрируем строковый массив
    arr.sort();
    return arr;
}

function sortNumArr(arr) { //сотрируем числовой массив
    arr.sort(compareNum);
    function compareNum (a, b) {
        return a - b;
    }
    return arr;
}
function lengthObj(Obj) { //old`s
    let counter = 0;
    for (let key in Obj) {
        counter ++;
    }
    return counter;
}
// function lengthObj2(Obj) {
//     return Object.keys(Obj).length;
// }


// const {mm1} = myObject.n5; // get block from obj

// Object.keys(myObject).map(function (key, index) {
    //     myObject[key] *= 2;
    // });
    // myArr = Object.values(myObject); // этой строкой преобразуем объект в массив

   