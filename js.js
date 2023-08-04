document.addEventListener("DOMContentLoaded", onPageLoaded);


function onPageLoaded() {
  
  const titlesContainer =document.querySelector(".titles-container");
  const pointsList = document.querySelector(".points-list");
  const textReseiver = document.querySelector('.text-reseiver');
  const scoreReseiver = document.querySelector('.score-reseiver');
  const addBtn = document.querySelector(".add-btn");
  const sortBtn = document.querySelector(".sort-btn");
  const allBtn = document.querySelectorAll("button","h3");
  let targetTitle = document.querySelector('.menu-title');
  let menuTitle = document.querySelector('.menu-title');
  const deleteBtn = document.querySelector('.point-delete');
    
  
  
  putPointsInStorage();
  getPointsFromStorage();
  
  
  deleteBtn.addEventListener('click', deletePoint);
  const btnAddMenuTitle = document.querySelector('.btn-add-menu-title');
  btnAddMenuTitle.addEventListener('click', addMenu);
  scoreReseiver.addEventListener('change', showRangeResult);
  addBtn.addEventListener('click', addPoint);
  sortBtn.addEventListener('click', sortPoint);
  for (let button of allBtn) {button.addEventListener('click', putPointsInStorage)};
  
  function putPointsInStorage(){
  let pointsListContent = pointsList.innerHTML;
    localStorage.setItem('pointsListStored', JSON.stringify(pointsListContent));
    
    let titlesContainerContent = titlesContainer.innerHTML;
    localStorage.setItem('titlesContainerStored', JSON.stringify(titlesContainerContent));
  
   targetTitle.dataset.menuContent = pointsList.innerHTML;
  };
    
  function getPointsFromStorage() {
    const pointsList = document.querySelector(".points-list");
    const pointsListStored = JSON.parse(localStorage.getItem('pointsListStored'));
    pointsList.innerHTML = pointsListStored;
    const titlesContainer = document.querySelector(".titles-container");
    const titlesContainerStored = JSON.parse(localStorage.getItem('titlesContainerStored'));
    titlesContainer.innerHTML = titlesContainerStored;
    
    const allDeleteBtn = document.querySelectorAll('.point-delete');
    for (let button of allDeleteBtn) { button.addEventListener('click', deletePoint); };
    allMenuTitles = document.querySelectorAll('.menu-title');
    for (let title of allMenuTitles) {title.addEventListener('click', activateMenu)};

    
  };

  function showRangeResult() {
    const rangeResult = document.querySelector('.range-result')
    rangeResult.innerText = scoreReseiver.value;
  };
  
  function addMenu() {
    menuTitle = document.createElement('h3');
    menuTitle.classList.add('menu-title');
    menuTitle.setAttribute('contenteditable', 'true');
    menuTitle.textContent = 'Название';
    const deleteBtn = document.createElement("button");
    
    deleteBtn.classList.add("point-delete");
    deleteBtn.setAttribute('contenteditable', 'false');
    deleteBtn.textContent = "×";
    deleteBtn.addEventListener('click', deletePoint);
    menuTitle.append(deleteBtn);
    titlesContainer.append(menuTitle);
    allMenuTitles = document.querySelectorAll('.menu-title');
    for (let title of allMenuTitles) {title.addEventListener('click', activateMenu)};

  };
  
  function activateMenu(){
    targetTitle = event.target;
    const pointsList = document.querySelector(".points-list");
    targetTitle.dataset.menuContent === undefined ?pointsList.innerHTML = '':pointsList.innerHTML=targetTitle.dataset.menuContent ;
    
    return targetTitle;
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
