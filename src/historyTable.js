const searchHistoryTable = document.querySelector('.search-history-table');
const searchHistoryTableBody = document.querySelector('.search-history-table-body');
const searchHistoryBtn = document.querySelector('.search-history');

function fillTable (data) {
    searchHistoryTableBody.innerHTML = '';
    data.forEach(obj => {
      let tr = `<tr><td>${obj.name}</td><td>${obj.country}</td><td>${obj.temperature}</td><td>${obj.wind_speed}</td><td>${obj.description}</td></tr>`
      searchHistoryTableBody.innerHTML += tr;
    })
  }

  searchHistoryBtn.addEventListener('click', function () {
    searchHistoryTable.classList.toggle('active')
    searchHistoryBtn.classList.toggle('active');
  });

  module.exports = fillTable;