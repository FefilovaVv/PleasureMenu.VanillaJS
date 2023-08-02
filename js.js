document.addEventListener("DOMContentLoaded", onPageLoaded);


function onPageLoaded() {
  const textReseiver = document.querySelector('.text-reseiver');
  const scoreReseiver = document.querySelector('.score-reseiver');
  const addBtn = document.querySelector(".add-btn");
  const sortBtn = document.querySelector(".sort-btn");
  const pointsList = document.querySelector(".points-list");
  

  addBtn.addEventListener('click', addPoint);
  sortBtn.addEventListener('click', sortPoint);


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
    
    deleteBtn.addEventListener('click', deletePoint)
  };
  
  function sortPoint() {
    const allScores = document.querySelectorAll(".point-score");
    const sortedScores = [...allScores].sort(function(a, b) { return a.innerText - b.innerText });
    for (let score of sortedScores) {
      pointsList.appendChild(score.parentNode);
    }
  };

  function deletePoint() {
      this.parentNode.remove();
    };
    
  };
