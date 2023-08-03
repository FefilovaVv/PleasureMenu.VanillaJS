document.addEventListener("DOMContentLoaded", onPageLoaded);


function onPageLoaded() {
  getPointsFromStorage();

  const pointsList = document.querySelector(".points-list");
  const textReseiver = document.querySelector('.text-reseiver');
  const scoreReseiver = document.querySelector('.score-reseiver');
  const addBtn = document.querySelector(".add-btn");
  const sortBtn = document.querySelector(".sort-btn");
  const allBtn = document.querySelectorAll("button");


  scoreReseiver.addEventListener('change', showRangeResult)
  addBtn.addEventListener('click', addPoint);
  sortBtn.addEventListener('click', sortPoint);
  for (let button of allBtn) {button.addEventListener('click', putPointsInStorage)};


  function putPointsInStorage(){
  let pointsListContent = pointsList.innerHTML;
    localStorage.setItem('pointsListStored', JSON.stringify(pointsListContent));};
    
  function getPointsFromStorage() {
    
    const pointsList = document.querySelector(".points-list");
    const pointsListStored = JSON.parse(localStorage.getItem('pointsListStored'));
    pointsList.innerHTML = pointsListStored;
    
    const allDeleteBtn = document.querySelectorAll('.point-delete');
    for (let button of allDeleteBtn) { button.addEventListener('click', deletePoint); };
    
  };

  function showRangeResult() {
    const rangeResult = document.querySelector('.range-result')
    rangeResult.innerText = scoreReseiver.value;
  };

  function addPoint() {
    const pointContainer = document.createElement("li");
    pointContainer.classList.add("point-container");
    const pointText = document.createElement("span");
    pointText.classList.add("point-text");
    const pointScore = document.createElement("span");
    pointScore.classList.add("point-score");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("point-delete");

    pointText.textContent = textReseiver.value;
    pointScore.textContent = scoreReseiver.value;
    deleteBtn.textContent = "×";

    pointsList.appendChild(pointContainer).append(pointText, pointScore, deleteBtn);
  deleteBtn.addEventListener('click', deletePoint);
  };

  function sortPoint() {
    const allScores = document.querySelectorAll(".point-score");
    const sortedScores = [...allScores].sort(function(a, b) { return a.innerText - b.innerText });
    for (let score of sortedScores) {
      pointsList.appendChild(score.parentNode);
     };
  };

  function deletePoint() {
    this.parentNode.remove();
  };
};
