
const iqFunction = () => {
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
    // return 'index'
}