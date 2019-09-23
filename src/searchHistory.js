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
    checkUniqueKey(myHistoryData, newItem);
    localStorage.setItem('myHistoryData', JSON.stringify(myHistoryData));
}

function checkUniqueKey (arr, newItem) {
    let needToPush = true;
    arr.forEach((item, i) => {
        if (item.name === newItem.name) {
        arr.splice(i, 1, newItem);
        needToPush = false;
        }
    });
    if (needToPush) {
        arr.push(newItem);
    }
};

clearSearchHistoryBtn.addEventListener('click', clearMyHistory); 

module.exports = { addMyHistory, myHistoryData, clearMyHistory };