let fillTable = require('./historyTable');
const clearSearchHistoryBtn = document.querySelector('.clear-search-history');
let myHistoryData = [];
(function init () {
    if (localStorage.getItem('myHistoryData')) {
    myHistoryData = JSON.parse(localStorage.getItem('myHistoryData'));
    }
    fillTable(myHistoryData);
})();

function clearMyHistory () {
    localStorage.removeItem('myHistoryData');
    myHistoryData = [];
    fillTable(myHistoryData);
}

function addMyHistory (newItem) {
    localStorage.setItem('myHistoryData', JSON.stringify(checkUniqueKey(myHistoryData, newItem)));
    myHistoryData = checkUniqueKey(myHistoryData, newItem);
}

const getCurrentHistoryData = () => myHistoryData;          

function checkUniqueKey (arr, newItem) {
    let needToPush = true;
    let newArr = arr.map((item) => {
        if (item.name === newItem.name) {
            needToPush = false;
            return newItem;
        } else return item;
        })
    if (needToPush) {
        newArr.push(newItem);
    }
    return newArr;
};

clearSearchHistoryBtn.addEventListener('click', clearMyHistory); 

module.exports = { addMyHistory, getCurrentHistoryData, clearMyHistory };